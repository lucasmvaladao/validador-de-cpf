function verificar() {
    const cpfInput = document.getElementById('cpf');
    const veriContainer = document.getElementById('veriConteiner');

    const cpf = cpfInput.value.replace(/[^\d]/g, '').trim(); // Remover caracteres não numéricos e espaços em branco

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        veriContainer.value = "CPF deve ter 11 dígitos. Tente novamente.";
        return;
    }

    const cpfArray = cpf.split('').map(Number); // Converter para array de números

    // Calcular os dígitos verificadores
    const digitosVerificadores = calcularDigitosVerificadores(cpfArray);

    // Verificar se os dígitos verificadores estão corretos
    if (cpfArray[9] === digitosVerificadores[0] && cpfArray[10] === digitosVerificadores[1]) {
        veriContainer.value = "CPF válido";
    } else {
        veriContainer.value = "CPF inválido. Tente novamente.";
    }
}

function calcularDigitosVerificadores(cpfArray) {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpfArray[i] * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    primeiroDigito = primeiroDigito > 9 ? 0 : primeiroDigito;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += cpfArray[i] * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    segundoDigito = segundoDigito > 9 ? 0 : segundoDigito;

    return [primeiroDigito, segundoDigito];
}

