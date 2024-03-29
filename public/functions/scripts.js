function showAnimation(mensagem, formId, videoDivId, videoId) {
    event.preventDefault();
    const videoContainer = document.getElementById(videoDivId);
    videoContainer.style.zIndex = '9999';
    const video = document.getElementById(videoId);
    video.style.display = 'block';
    video.play();

    // Exibir a mensagem
    const message = document.getElementById(mensagem);
    message.style.display = 'block';

    setTimeout(function () {
        document.getElementById(formId).submit();
    }, 2000);
}


function validarSenha(senha1, senha2) {
    var senha = document.getElementById(senha1).value;
    var senhaConfirm = document.getElementById(senha2).value;

    if (senha != senhaConfirm) {
        alert("As senhas não correspondem. Tente novamente.");
        return false;
    } else {
        return true;
    }
}

window.onload = function () {
    var video_logout = document.getElementById('video-logout');
    var video_delete = document.getElementById('video-delete');
    if (video_logout) {
        video_logout.onplay = function () {
            setTimeout(function () {
                window.location.href = '/users/login';
            }, 3000);
        };
    } else if (video_delete) {
        var id = "{{id}}"
        video_delete.onplay = function () {
            setTimeout(function () {
                fetch('/users/delete', {
                    method: 'POST'
                }).then(() => {
                    window.location.href = '/users';
                });
            }, 3000);
        };
    }
}
