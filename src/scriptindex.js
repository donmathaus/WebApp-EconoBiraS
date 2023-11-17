 // Redirecionar para a segunda página após 5 segundos
 setTimeout(function() {
            
    window.location.href = "index2.html";
}, 5000);

// Exibir a mensagem de carregamento após 3 segundos
setTimeout(function() {
    document.getElementById('loading').style.display = 'block';
}, 3000);