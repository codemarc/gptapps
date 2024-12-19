document.addEventListener('DOMContentLoaded', () => {
    const passwordEl = document.getElementById('password')
    const lengthSlider = document.getElementById('lengthSlider')
    const lengthNumber = document.getElementById('lengthNumber')
    const uppercaseEl = document.getElementById('uppercase')
    const lowercaseEl = document.getElementById('lowercase')
    const numbersEl = document.getElementById('numbers')
    const symbolsEl = document.getElementById('symbols')
    const generateBtn = document.getElementById('generate')
    const copyBtn = document.getElementById('copy')

    const randomFunc = {
        lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
        upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
        number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
        symbol: () => '!@#$%^&*()_+=-{}[]|:;<>?,.'[Math.floor(Math.random() * 24)]
    }

    function generatePassword() {
        const length = +lengthNumber.value
        const hasLower = lowercaseEl.checked
        const hasUpper = uppercaseEl.checked
        const hasNumber = numbersEl.checked
        const hasSymbol = symbolsEl.checked

        if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
            alert('Please select at least one option')
            return
        }

        let generatedPassword = ''
        const typesArr = [
            { checked: hasLower, func: randomFunc.lower },
            { checked: hasUpper, func: randomFunc.upper },
            { checked: hasNumber, func: randomFunc.number },
            { checked: hasSymbol, func: randomFunc.symbol }
        ].filter(type => type.checked)

        for (let i = 0; i < length; i++) {
            const funcIdx = Math.floor(Math.random() * typesArr.length)
            generatedPassword += typesArr[funcIdx].func()
        }

        passwordEl.value = generatedPassword
    }

    lengthSlider.addEventListener('input', (e) => {
        lengthNumber.value = e.target.value
    })

    lengthNumber.addEventListener('input', (e) => {
        lengthSlider.value = e.target.value
    })

    generateBtn.addEventListener('click', generatePassword)

    copyBtn.addEventListener('click', () => {
        const textarea = document.createElement('textarea')
        const password = passwordEl.value

        if (!password) return

        textarea.value = password
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
        alert('Password copied to clipboard!')
    })

    generatePassword()
})