document.addEventListener('DOMContentLoaded', function() {
    const carrosseis = document.querySelectorAll('.carrossel-wrapper');
    
    carrosseis.forEach(wrapper => {
        const container = wrapper.querySelector('.carrossel-container');
        const btnEsquerda = wrapper.querySelector('.carrossel-seta.esquerda');
        const btnDireita = wrapper.querySelector('.carrossel-seta.direita');
        const items = wrapper.querySelectorAll('.carrossel-item');
        const gap = 15; // Deve corresponder ao gap do CSS
        
        let currentScroll = 0;
        
        function calcularLimiteDireito() {
            const containerWidth = wrapper.offsetWidth;
            const totalContentWidth = container.scrollWidth;
            
            // O scroll máximo é a diferença entre o conteúdo total e o container
            // Adicionamos um pequeno ajuste (2px) para evitar problemas de arredondamento
            return Math.max(totalContentWidth - containerWidth - 2, 0);
        }
        
        let maxScroll = calcularLimiteDireito();
        
        function atualizarCarrossel() {
            // Garante que não ultrapasse os limites com tolerância zero
            currentScroll = Math.min(Math.max(currentScroll, 0), maxScroll);
            container.style.transform = `translateX(-${currentScroll}px)`;
            
            // Atualiza estados das setas com verificação rigorosa
            btnEsquerda.disabled = currentScroll <= 0;
            btnDireita.disabled = currentScroll >= maxScroll;
            
            console.log(`Scroll: ${currentScroll} | Máximo: ${maxScroll}`); // Para debug
        }
        
        btnDireita.addEventListener('click', () => {
            const scrollAmount = wrapper.offsetWidth * 0.8; // Rola ~80% da largura visível
            currentScroll += scrollAmount;
            atualizarCarrossel();
        });
        
        btnEsquerda.addEventListener('click', () => {
            const scrollAmount = wrapper.offsetWidth * 0.8; // Rola ~80% da largura visível
            currentScroll -= scrollAmount;
            atualizarCarrossel();
        });
        
        // Observador para recálculo automático
        const observer = new ResizeObserver(() => {
            maxScroll = calcularLimiteDireito();
            atualizarCarrossel();
        });
        
        observer.observe(wrapper);
        observer.observe(container);
        
        // Inicialização
        atualizarCarrossel();
    });
});