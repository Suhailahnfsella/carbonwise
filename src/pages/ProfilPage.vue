<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = ref({
  name: 'Suhailah Auryn Khonsa',
  nik: '3515066501010101',
  email: 'suhailahrynsa@mail.com'
})

const showEditModal = ref(false)
const editStep = ref('form')
const showPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const editForm = ref({
  email: profile.value.email,
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const verificationCode = ref(['', '', '', '', '', ''])
const codeInputs = ref([])

const errors = ref({
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  verification: ''
})

const notification = ref({ show: false, message: '', type: 'success' })

const validateEmailFormat = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regex.test(password)
}

const openEditModal = () => {
  editForm.value = {
    email: profile.value.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  verificationCode.value = ['', '', '', '', '', '']
  errors.value = {
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    verification: ''
  }
  editStep.value = 'form'
  showEditModal.value = true
}

const processEmailChange = () => {
  errors.value = {
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    verification: ''
  }

  if (!editForm.value.currentPassword) {
    errors.value.currentPassword = 'Password saat ini harus diisi.'
    return
  }

  if (!validateEmailFormat(editForm.value.email)) {
    errors.value.email = 'Format email tidak valid.'
    return
  }

  if (editForm.value.email === profile.value.email) {
    errors.value.email = 'Email baru harus berbeda dengan email saat ini.'
    return
  }

  if (editForm.value.newPassword || editForm.value.confirmPassword) {
    if (editForm.value.newPassword !== editForm.value.confirmPassword) {
      errors.value.confirmPassword = 'Password baru dan konfirmasi password tidak cocok!'
      return
    }

    if (!validatePassword(editForm.value.newPassword)) {
      errors.value.newPassword = 'Password harus minimal 8 karakter dan mengandung huruf serta angka.'
      return
    }
  }

  editStep.value = 'emailCode'
  showNotification(`Kode verifikasi dikirim ke ${editForm.value.email}`)
}

const handleCodeInput = (index) => {
  const currentInput = codeInputs.value[index]
  const nextInput = codeInputs.value[index + 1]

  if (verificationCode.value[index].length > 1) {
    verificationCode.value[index] = verificationCode.value[index].slice(0, 1)
  }

  if (nextInput && verificationCode.value[index] !== '') {
    nextInput.focus()
  }

  errors.value.verification = ''
}

const handleBackspace = (index, event) => {
  if (verificationCode.value[index] === '' && index > 0) {
    codeInputs.value[index - 1].focus()
  }
}

const verifyCode = () => {
  const fullCode = verificationCode.value.join('')

  if (fullCode.length < 6 || verificationCode.value.includes('')) {
    errors.value.verification = 'Kode verifikasi harus 6 digit lengkap.'
    return
  }

  if (editForm.value.newPassword === '' && editForm.value.confirmPassword === '') {
    saveProfileChanges()
  } else {
    editStep.value = 'password'
  }
}

const saveProfileChanges = () => {
  if (!editForm.value.currentPassword) {
    errors.value.currentPassword = 'Password saat ini harus diisi.'
    editStep.value = 'form'
    return
  }

  if (editForm.value.newPassword || editForm.value.confirmPassword) {
    if (!validatePassword(editForm.value.newPassword)) {
      errors.value.newPassword = 'Password harus minimal 8 karakter dan mengandung huruf serta angka.'
      editStep.value = 'form'
      return
    }

    if (editForm.value.newPassword !== editForm.value.confirmPassword) {
      errors.value.confirmPassword = 'Password baru dan konfirmasi password tidak cocok!'
      editStep.value = 'form'
      return
    }
  }

  profile.value.email = editForm.value.email

  showNotification('Profil berhasil diperbarui!')
  showEditModal.value = false
}

const showNotification = (msg, type = 'success') => {
  notification.value = { show: true, message: msg, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const logout = () => {
  router.push('/')
}
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Profil</span>
    </template>

    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="space-y-6">

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">Nama Lengkap</p>
              <p class="font-medium">{{ profile.name }}</p>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">NIK</p>
              <p class="font-medium">{{ profile.nik }}</p>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium">{{ profile.email }}</p>
            </div>
          </div>
        </div>

        <div class="flex space-x-4 pt-4">
          <button @click="openEditModal"
            class="px-4 py-2 bg-darkblue text-white rounded-md hover:bg-primaryblue transition-colors">
            Edit Profil
          </button>

          <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">
                {{
                  editStep === 'form' ? 'Edit Profil' :
                    editStep === 'emailCode' ? 'Verifikasi Email' :
                      'Ubah Password'
                }}
              </h3>
              <button @click="showEditModal = false" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="editStep === 'form' ? processEmailChange() :
              editStep === 'emailCode' ? verifyCode() :
                saveProfileChanges()" class="space-y-4">

              <template v-if="editStep === 'form'">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input v-model="editForm.email" type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue"
                    :class="{ 'border-red-500': errors.email }">
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                  <div class="relative">
                    <input v-model="editForm.currentPassword" :type="showPassword ? 'text' : 'password'"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue pr-10"
                      :class="{ 'border-red-500': errors.currentPassword }" placeholder="Diperlukan untuk perubahan">
                    <button type="button" @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.503-4.348m2.49-1.852A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.138 5.016M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">{{ errors.currentPassword }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                  <div class="relative">
                    <input v-model="editForm.newPassword" :type="showNewPassword ? 'text' : 'password'"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue pr-10"
                      :class="{ 'border-red-500': errors.newPassword }"
                      placeholder="Kosongkan jika tidak ingin mengubah">
                    <button type="button" @click="showNewPassword = !showNewPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path v-if="showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.503-4.348m2.49-1.852A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.138 5.016M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path v-if="showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                  <div class="relative">
                    <input v-model="editForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue pr-10"
                      :class="{ 'border-red-500': errors.confirmPassword }"
                      placeholder="Kosongkan jika tidak ingin mengubah">
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.503-4.348m2.49-1.852A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.138 5.016M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
                </div>
              </template>

              <template v-else-if="editStep === 'emailCode'">
                <div class="text-center mb-4">
                  <p>Kami telah mengirim kode verifikasi ke:</p>
                  <p class="font-semibold">{{ editForm.email }}</p>
                  <p class="text-sm text-gray-500 mt-2">Masukkan 6 digit kode verifikasi</p>
                </div>

                <div class="flex justify-center gap-2 mb-4">
                  <input v-for="(digit, index) in 6" :key="index" ref="codeInputs" type="number" maxlength="1"
                    v-model="verificationCode[index]" @input="handleCodeInput(index)"
                    @keydown.backspace.prevent="handleBackspace(index, $event)"
                    class="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue"
                    :class="{ 'border-red-500': errors.verification }">
                </div>
                <p v-if="errors.verification" class="text-red-500 text-sm text-center">{{ errors.verification }}</p>

                <div class="text-center text-sm text-gray-500 mt-2">
                  <p>Tidak menerima kode? <button type="button" class="text-primaryblue hover:underline">Kirim
                      ulang</button></p>
                </div>
              </template>

              <template v-else-if="editStep === 'password'">
                <div class="text-center mb-4">
                  <p class="font-semibold">Verifikasi email berhasil!</p>
                  <p v-if="editForm.newPassword" class="mt-2">Silahkan konfirmasi perubahan password Anda</p>
                </div>

                <div v-if="editForm.newPassword">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                    <div class="relative">
                      <input v-model="editForm.newPassword" :type="showNewPassword ? 'text' : 'password'"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue pr-10"
                        :class="{ 'border-red-500': errors.newPassword }" disabled>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                    <div class="relative">
                      <input v-model="editForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryblue pr-10"
                        :class="{ 'border-red-500': errors.confirmPassword }" disabled>
                    </div>
                  </div>
                </div>
              </template>

              <div class="flex justify-end space-x-3 pt-4">
                <button v-if="editStep !== 'form'" type="button" @click="editStep = 'form'"
                  class="px-4 py-2 border border-secondaryoranye rounded-md text-secondaryoranye hover:bg-gray-50">
                  Kembali
                </button>
                <button type="submit" class="px-4 py-2 bg-primaryoranye text-white rounded-md hover:bg-secondaryoranye">
                  {{
                    editStep === 'form' ? 'Lanjutkan' :
                      editStep === 'emailCode' ? 'Verifikasi' :
                        'Simpan Perubahan'
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-if="notification.show" :class="[
        'fixed top-4 right-4 px-4 py-3 rounded text-white z-50 shadow-lg max-w-xs',
        notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]">
        {{ notification.message }}
      </div>
    </div>
  </DashboardLayout>
</template>
