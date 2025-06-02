<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, defineEmits, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)

const props = defineProps({
  overlayOpacity: {
    type: Number,
    default: 0.5
  },
  mode: {
    type: String,
    default: 'login',
    validator: (v) => ['login', 'register'].includes(v)
  }
})

const emit = defineEmits(['close', 'update:mode'])

const modalRef = ref(null)

const form = ref({
  email: '',
  password: '',
  fullName: '',
  nik: '',
  regEmail: '',
  regPassword: '',
  occupation: 'pilih',
})

const resetStep = ref(null)
const resetEmail = ref('')
const newPassword = ref('')

const occupations = [
  { value: 'pilih', label: 'Pilih Kesibukan', disabled: true },
  { value: 'pekerja', label: 'Pekerja' },
  { value: 'pelajar', label: 'Pelajar' },
  { value: 'lainnya', label: 'Lainnya' },
]

const errors = ref({
  login: {
    email: '',
    password: '',
    general: ''
  },
  reset: {
    email: '',
    code: '',
    password: ''
  },
  register: {
    fullName: '',
    nik: '',
    email: '',
    password: '',
    occupation: ''
  }
})

const notification = ref({ show: false, message: '', type: 'success' })

const code = ref(['', '', '', '', '', ''])
const codeInputs = ref([])

const showNotification = (msg, type = 'success') => {
  notification.value = { show: true, message: msg, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const validateEmailFormat = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regex.test(password)
}

const validateFullName = (name) => {
  const regex = /^[A-Za-z\s]+$/
  return regex.test(name)
}

const validateNik = (nik) => {
  const regex = /^\d{16}$/
  return regex.test(nik)
}

watch(() => form.value.fullName, (newVal) => {
  form.value.fullName = newVal.toUpperCase()
})

const login = () => {
  const email = form.value.email.trim()
  const password = form.value.password

  errors.value.login.email = ''
  errors.value.login.password = ''
  errors.value.login.general = ''

  if (!validateEmailFormat(email)) {
    errors.value.login.email = 'Format email tidak valid.'
  }

  if (!validatePassword(password)) {
    errors.value.login.password = 'Password harus minimal 8 karakter dan mengandung huruf serta angka.'
  }

  if (errors.value.login.email || errors.value.login.password) {
    return
  }

  emit('close')
  showNotification('Berhasil masuk ke akun!')
  router.push({ path: '/dashboard/ecomap' })
}

const register = () => {
  errors.value.register.fullName = ''
  errors.value.register.nik = ''
  errors.value.register.email = ''
  errors.value.register.password = ''
  errors.value.register.occupation = ''

  let valid = true

  form.value.fullName = String(form.value.fullName || '')
  form.value.nik = String(form.value.nik || '')
  form.value.regEmail = String(form.value.regEmail || '')
  form.value.regPassword = String(form.value.regPassword || '')

  if (!form.value.fullName.trim()) {
    errors.value.register.fullName = 'Nama lengkap wajib diisi'
    valid = false
  } else if (!validateFullName(form.value.fullName.trim())) {
    errors.value.register.fullName = 'Nama lengkap hanya boleh huruf dan spasi'
    valid = false
  }

  if (!form.value.nik.trim()) {
    errors.value.register.nik = 'NIK wajib diisi'
    valid = false
  } else if (!validateNik(form.value.nik.trim())) {
    errors.value.register.nik = 'NIK harus 16 digit angka'
    valid = false
  }

  if (!validateEmailFormat(form.value.regEmail)) {
    errors.value.register.email = 'Format email tidak valid'
    valid = false
  }

  if (!validatePassword(form.value.regPassword)) {
    errors.value.register.password = 'Password harus minimal 8 karakter dan mengandung huruf serta angka.'
    valid = false
  }

  if (form.value.occupation === 'pilih') {
    errors.value.register.occupation = 'Pilih kesibukan harus dipilih'
    valid = false
  }

  if (!valid) {
    return
  }

  resetEmail.value = form.value.regEmail
  resetStep.value = 'codeRegister'

  code.value = ['', '', '', '', '', '']
  codeInputs.value = []
}

const verifyRegisterCode = () => {
  const fullCode = code.value.join('')
  if (fullCode.length < 6 || code.value.includes('')) {
    errors.value.reset.code = 'Kode verifikasi harus 6 digit lengkap.'
    return
  }
  errors.value.reset.code = ''

  resetStep.value = null
  showNotification('Akun berhasil dibuat! Silahkan masuk.')
  emit('update:mode', 'login')

  form.value.fullName = ''
  form.value.nik = ''
  form.value.regEmail = ''
  form.value.regPassword = ''
  form.value.occupation = 'pilih'
  code.value = ['', '', '', '', '', '']
  resetEmail.value = ''
}

const forgotPassword = () => {
  resetStep.value = 'email'
}

const submitResetEmail = () => {
  if (!validateEmailFormat(resetEmail.value.trim())) {
    errors.value.reset.email = 'Format email tidak valid.'
    return
  }
  errors.value.reset.email = ''
  showNotification(`Kode verifikasi dikirim ke ${resetEmail.value.trim()}`)
  resetStep.value = 'code'
}

const verifyCode = () => {
  const fullCode = code.value.join('')
  if (fullCode.length < 6 || code.value.includes('')) {
    errors.value.reset.code = 'Kode verifikasi harus 6 digit lengkap.'
    return
  }
  errors.value.reset.code = ''
  resetStep.value = 'newPassword'
  code.value = ['', '', '', '', '', '']
}

const handleCodeInput = (index) => {
  const currentInput = codeInputs.value[index]
  const nextInput = codeInputs.value[index + 1]
  if (code.value[index].length > 1) {
    code.value[index] = code.value[index].slice(0, 1)
  }
  if (nextInput && code.value[index] !== '') {
    nextInput.focus()
  }
  errors.value.code = ''
}

const handleBackspace = (index, event) => {
  if (code.value[index] === '' && index > 0) {
    codeInputs.value[index - 1].focus()
  }
}

const saveNewPassword = () => {
  if (!validatePassword(newPassword.value)) {
    errors.value.reset.password = 'Password minimal 8 karakter dan mengandung huruf serta angka.'
    return
  }
  errors.value.reset.password = ''
  showNotification('Password baru berhasil disimpan')
  resetStep.value = null
  emit('update:mode', 'login')
  newPassword.value = ''
  resetEmail.value = ''
}

const handleClickOutside = (event) => {
  if (modalRef.value && !modalRef.value.contains(event.target)) {
    emit('close')
    resetStep.value = null
    errors.value.login.email = ''
    errors.value.login.password = ''
    errors.value.login.general = ''
    errors.value.reset.email = ''
    errors.value.reset.code = ''
    errors.value.reset.password = ''
    errors.value.register.fullName = ''
    errors.value.register.nik = ''
    errors.value.register.email = ''
    errors.value.register.password = ''
    errors.value.register.occupation = ''
    newPassword.value = ''
    resetEmail.value = ''
    code.value = ['', '', '', '', '', '']
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})` }">
    <div ref="modalRef"
      class="bg-white p-6 rounded-xl mx-5 shadow-md w-90 md:w-[400px] lg:w-[500px] max-h-[90vh] overflow-auto">
      <template v-if="resetStep === 'email'">
        <h2 class="text-xl font-bold mb-4 text-center text-darkblue">Reset Password</h2>
        <input type="email" placeholder="Masukkan email" v-model="resetEmail" @input="errors.reset.email = ''"
          class="w-full mb-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.reset.email" class="text-red-500 text-sm">{{ errors.reset.email }}</p>
        <button @click="submitResetEmail"
          class="w-full bg-primaryoranye text-white rounded-lg mt-2 py-2 hover:bg-secondaryoranye transition">
          Kirim Kode Verifikasi
        </button>
      </template>

      <template v-else-if="resetStep === 'code'">
        <h2 class="text-xl font-bold mb-4 text-center text-darkblue">Masukkan Kode Verifikasi</h2>
        <div class="flex justify-center gap-2 mb-2">
          <input v-for="(digit, index) in 6" :key="index" ref="codeInputs" type="text" maxlength="1"
            class="w-10 h-12 text-center text-lg text-gray-700 border border-gray-400 rounded-lg focus:border-gray-700 outline-none"
            v-model="code[index]" @input="handleCodeInput(index)"
            @keydown.backspace.prevent="handleBackspace(index, $event)" />
        </div>
        <p v-if="errors.reset.code" class="text-red-500 text-sm text-center">{{ errors.reset.code }}</p>
        <button @click="verifyCode"
          class="w-full bg-primaryoranye text-white rounded-lg mt-2 py-2 hover:bg-secondaryoranye transition">
          Verifikasi
        </button>
      </template>

      <template v-else-if="resetStep === 'newPassword'">
        <h2 class="text-xl font-bold mb-4 text-center text-darkblue">Buat Password Baru</h2>
        <div class="relative w-full mb-2">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Password Baru" v-model="newPassword"
            @input="errors.reset.password = ''"
            class="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:border-gray-700 outline-none pr-10" />
          <svg v-if="!showPassword" @click="showPassword = true" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-2.5 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else @click="showPassword = false" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-2.5 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.503-4.348m2.49-1.852A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.138 5.016M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
          </svg>
        </div>
        <p v-if="errors.reset.password" class="text-red-500 text-sm">{{ errors.reset.password }}</p>
        <button @click="saveNewPassword"
          class="w-full bg-primaryoranye text-white rounded-lg mt-2 py-2 hover:bg-secondaryoranye transition">
          Simpan
        </button>
      </template>

      <template v-else-if="resetStep === 'codeRegister'">
        <h2 class="text-xl font-bold mb-2 text-center text-darkblue">Verifikasi Registrasi</h2>
        <p class="text-gray-800 mb-2">Kode verifikasi sudah dikirim ke email: <strong>{{ resetEmail }}</strong></p>
        <div class="flex justify-center gap-2 mb-2">
          <input v-for="(digit, index) in 6" :key="index" ref="codeInputs" type="text" maxlength="1"
            class="w-10 h-12 text-center text-lg text-gray-700 border border-gray-400 rounded-lg focus:border-gray-700 outline-none"
            v-model="code[index]" @input="handleCodeInput(index)"
            @keydown.backspace.prevent="handleBackspace(index, $event)" />
        </div>
        <p v-if="errors.reset.code" class="text-red-500 text-sm text-center">{{ errors.reset.code }}</p>
        <button @click="verifyRegisterCode"
          class="w-full bg-primaryoranye text-white rounded-lg mt-2 py-2 hover:bg-secondaryoranye transition">
          Verifikasi Akun
        </button>
      </template>

      <template v-else-if="props.mode === 'login'">
        <h2 class="text-xl font-bold mb-4 text-center text-darkblue">Masuk ke akunmu</h2>
        <input type="text" placeholder="Email" v-model="form.email" @input="errors.login.email = ''"
          class="w-full mb-3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.login.email" class="text-red-500 text-sm mb-2">{{ errors.login.email }}</p>
        <div class="relative w-full mb-2">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="form.password"
            @input="errors.login.password = ''"
            class="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none pr-10" />
          <svg v-if="!showPassword" @click="showPassword = true" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-2.5 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else @click="showPassword = false" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-2.5 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.503-4.348m2.49-1.852A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.138 5.016M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
          </svg>
        </div>
        <p v-if="errors.login.password" class="text-red-500 text-sm mb-2">{{ errors.login.password }}</p>
        <p v-if="errors.login.general" class="text-red-500 text-sm mb-2">{{ errors.login.general }}</p>
        <div class="text-right mb-2">
          <button @click="forgotPassword" class="text-sm text-secondaryoranye hover:text-primaryoranye">
            Lupa password?
          </button>
        </div>
        <button @click="login"
          class="w-full mb-1 bg-primaryoranye text-white rounded-lg py-2 hover:bg-secondaryoranye transition">
          Masuk
        </button>
        <div class="flex justify-center mt-4 gap-2 text-darkblue">
          <span>Belum punya akun?</span>
          <button @click="$emit('update:mode', 'register')" class="text-primaryoranye hover:text-secondaryoranye">
            Register
          </button>
        </div>
      </template>

      <template v-else-if="props.mode === 'register'">
        <h2 class="text-xl font-bold mb-4 text-center text-darkblue">Daftar Akun Baru</h2>
        <input type="text" placeholder="Nama lengkap" v-model="form.fullName" @input="errors.register.fullName = ''"
          class="w-full mb-3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.register.fullName" class="text-red-600 text-sm mb-2">{{ errors.register.fullName }}</p>
        <input type="number" placeholder="NIK" v-model="form.nik" @input="errors.register.nik = ''"
          class="w-full mb-3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.register.nik" class="text-red-600 text-sm mb-2">{{ errors.register.nik }}</p>
        <input type="email" placeholder="Email" v-model="form.regEmail" @input="errors.register.email = ''"
          class="w-full mb-3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.register.email" class="text-red-600 text-sm mb-2">{{ errors.register.email }}</p>
        <input type="password" placeholder="Password" v-model="form.regPassword" @input="errors.register.password = ''"
          class="w-full mb-3 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none" />
        <p v-if="errors.register.password" class="text-red-600 text-sm mb-2">{{ errors.register.password }}</p>
        <select id="reg-occupation" v-model="form.occupation" @change="errors.register.occupation = ''"
          class="w-full text-gray-700 border border-gray-300 rounded-lg focus:border-gray-700 outline-none p-2 pr-10 appearance-none mb-3">
          <option v-for="item in occupations" :key="item.value" :value="item.value" :disabled="item.disabled">{{
            item.label }}</option>
        </select>
        <p v-if="errors.register.occupation" class="text-red-600 text-sm mb-2">{{ errors.register.occupation }}</p>
        <button @click="register"
          class="w-full bg-primaryoranye text-white rounded-lg py-2 hover:bg-secondaryoranye transition">
          Daftar
        </button>
        <div class="flex justify-center mt-4 gap-2">
          <span>Sudah punya akun?</span>
          <button @click="$emit('update:mode', 'login')" class="text-primaryoranye hover:text-secondaryoranye">
            Masuk
          </button>
        </div>
      </template>
    </div>
    <div v-if="notification.show" :class="[
      'fixed top-6 left-4 sm:left-6 md:left-10 lg:left-16 xl:left-20',
      'px-4 py-3 rounded text-white z-50 shadow-lg max-w-xs sm:max-w-sm md:max-w-md',
      notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]">
      {{ notification.message }}
    </div>
  </div>
</template>
