const cepField = document.querySelector('#cep')
const cepErrorField = document.querySelector('#cepError')
const streetField = document.querySelector('#rua')
const numberField = document.querySelector('#numero')
const neighborhoodField = document.querySelector('#bairro')
const cityField = document.querySelector('#cidade')
const stateField = document.querySelector('#estado')
const loadingField = document.querySelector('img#loading')
const formField = document.querySelector('form')

cepField.addEventListener('focus', () => {
  limparErrorCep()
})

cepField.addEventListener('blur', () => {
  let cep = cepField.value

  if (/\d{5}-?\d{3}/.test(cep)) {
    carregaInfoCep(cep)
  } else {
    mostrarErrorCep()
  }
})

function carregaInfoCep(cep) {
  loadingField.classList.toggle('hidden')
  formField.classList.toggle('loading')
  let url = `https://viacep.com.br/ws/${cep}/json/`
  fetch(url)
    .then(res => res.json())
    .then(cepInfo => {
      if(cepInfo.erro) {
        limparCamposDoEndereco()
      } else {
        formField.classList.toggle('loading')
        loadingField.classList.toggle('hidden')
        streetField.value = cepInfo.logradouro
        neighborhoodField.value = cepInfo.bairro
        cityField.value = cepInfo.localidade
        stateField.value = cepInfo.uf
  
        numberField.focus()
        limparErrorCep()
      }
    })
    .catch(error => {
      mostrarErrorCep()
    })
}

function limparErrorCep() {
  cepField.classList.remove('input-cep-error')
  cepErrorField.classList.add('hidden')
}

function mostrarErrorCep() {
  cepField.classList.add('input-cep-error')
  cepErrorField.classList.remove('hidden')
  limparCamposDoEndereco()
}

function limparCamposDoEndereco() {
  streetField.value = ''
  numberField.value = ''
  neighborhoodField.value = ''
  cityField.value = ''
  stateField.value = ''
}