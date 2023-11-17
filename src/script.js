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

    if (
        tipoGarrafa1.selectedIndex === 0 ||
        tipoGarrafa2.selectedIndex === 0 ||
        preco1 === '' ||
        preco2 === ''
    ) {
        alert('Por favor, preencha e selecione todas as opções antes de comparar.');
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

    
    var resultado = document.getElementById('resultado');
    var loadingAnimation = document.getElementById('loading-animation'); // Elemento para a animação de carregamento

    // Oculta o resultado enquanto a animação de loading está em execução
    resultado.style.display = 'none';

    // Adiciona a classe para exibir a animação 
    if (loadingAnimation) {
        loadingAnimation.style.display = 'block'; // Mostra a animação
    }

    // Adiciona um atraso de 2.5 segundos (2500ms) antes de exibir o resultado
    setTimeout(function () {
        

        resultado.innerHTML = '<span class="destaque-verde">' + garrafaMaisBarata + '</span> é a opção mais barata. Você economizará <span class="destaque-verde">' + economiaPercentual.toFixed(2) + '%</span>.';

        // Exibe o resultado após a execução da animação
        resultado.style.display = 'block';

        // Oculta a animação de carregamento após exibir o resultado 
        if (loadingAnimation) {
            loadingAnimation.style.display = 'none'; // Esconde a animação após o resultado ser exibido
        }
    }, 2500); // Tempo em milissegundos
}
