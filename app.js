document.addEventListener('DOMContentLoaded', () => {
    const manifestUri = 'https://alternatv.ar/stream/hls/live.m3u8';

    async function init() {
        const video = document.getElementById('video');
        const player = new shaka.Player(video);

        // Configurar los eventos de Shaka Player
        player.addEventListener('error', onErrorEvent);

        try {
            // Cargar el manifiesto
            await player.load(manifestUri);
            console.log('¡El video ha cargado exitosamente!');
        } catch (e) {
            onError(e);
        }
    }

    function onErrorEvent(event) {
        onError(event.detail);
    }

    function onError(error) {
        console.error('Error en Shaka Player', error);
    }

    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
        init();
    } else {
        console.error('¡El navegador no soporta Shaka Player!');
    }
});
