function validarPreco(input) {
    // Substituir caracteres não permitidos (exceto números e vírgula)
    input.value = input.value.replace(/[^\d,]/g, '');
}

function exibirImagem(tipoGarrafaId, imagemId) {
    var tipoGarrafa = document.getElementById(tipoGarrafaId);
    var imagemElement = document.getElementById(imagemId);
    
    if (tipoGarrafa && imagemElement) {
        var selectedOption = tipoGarrafa.options[tipoGarrafa.selectedIndex];
        var imagemPath = selectedOption.getAttribute('data-imagem');
        imagemElement.src = imagemPath;
    }
}

function compararPrecos() {
    // Verificar se as opções foram selecionadas
    var tipoGarrafa1 = document.getElementById('tipoGarrafa1');
    var tipoGarrafa2 = document.getElementById('tipoGarrafa2');

    if (!tipoGarrafa1.value || !tipoGarrafa2.value) {
        alert('Por favor, selecione uma opção para cada bebida antes de comparar.');
        return;
    }

    // Verificar se os preços foram preenchidos
    var preco1 = document.getElementById('preco1').value.trim();
    var preco2 = document.getElementById('preco2').value.trim();

    if (!preco1 || !preco2) {
        alert('Por favor, insira o preço para ambas as bebidas antes de comparar.');
        return;
    }

    // Obter os valores de entrada
    var tipoGarrafa1Text = tipoGarrafa1.options[tipoGarrafa1.selectedIndex].text;
    var preco1 = parseFloat(preco1.replace(',', '.')); // Substituir vírgula por ponto

    var tipoGarrafa2Text = tipoGarrafa2.options[tipoGarrafa2.selectedIndex].text;
    var preco2 = parseFloat(preco2.replace(',', '.')); // Substituir vírgula por ponto

    // Calcular o preço por litro
    var precoPorLitro1 = preco1 / (parseFloat(tipoGarrafa1.value) / 1000); // Convertendo para litros (1 litro = 1000 ml)
    var precoPorLitro2 = preco2 / (parseFloat(tipoGarrafa2.value) / 1000);

    // Determinar a garrafa mais barata
    var garrafaMaisBarata;
    var economiaPercentual;

    if (precoPorLitro1 < precoPorLitro2) {
        garrafaMaisBarata = tipoGarrafa1Text;
        economiaPercentual = ((precoPorLitro2 - precoPorLitro1) / precoPorLitro2) * 100;
    } else if (precoPorLitro1 > precoPorLitro2) {
        garrafaMaisBarata = tipoGarrafa2Text;
        economiaPercentual = ((precoPorLitro1 - precoPorLitro2) / precoPorLitro1) * 100;
    } else {
        garrafaMaisBarata = 'Ambas as bebidas têm o mesmo preço por litro.';
        economiaPercentual = 0;
    }

    // Exibir o resultado
    
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = '<span class="destaque-verde">' + garrafaMaisBarata + '</span> é a opção mais barata. Você economizará ' + economiaPercentual.toFixed(2) + '%.';
} 