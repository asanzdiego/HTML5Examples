/*
 * TODO: Sacar log de todos los posibles eventos que soporta
 * window.applicationCache
 * Llamaremos directamente a log(mensaje), en lugar de
 * console.log(mensaje), porque tenemos una función log()
 * disponible en otro de nuestros ficheros.
 *
 * Sigue el primer ejemplo y completa con el resto. Asegurate
 * de que el mensaje que se muestra tiene sentido con respecto
 * al evento capturado
 */
window.applicationCache.onchecking = function(e) {
    log("Checking for application update");
}

window.applicationCache.onnoupdate = function(e) {
    log("No application update found");
}

window.applicationCache.onupdateready = function(e) {
    log("Application update ready");
}

window.applicationCache.onobsolete = function(e) {
    log("Application obsolete");
}

window.applicationCache.ondownloading = function(e) {
    log("Downloading application update");
}

window.applicationCache.oncached = function(e) {
    log("Application cached");
}

window.applicationCache.onerror = function(e) {
    log("Application cache error");
}

window.addEventListener("online", function(e) {
    log("Online");
}, true);

window.addEventListener("offline", function(e) {
    log("Offline");
}, true);


/*
 * TODO: Crea la función showCacheStatus como una
 * función que reciba un argumento n (status code)
 * y devuelva 6 posibles mensajes, en función del
 * estado de la caché
 * Seguro que esto te ayuda: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache#Cache_states
 */
showCacheStatus = function(n) {
    statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
    return statusMessages[n];
}

install = function() {
    log("Checking for updates");
    try {
        window.applicationCache.update();
    } catch (e) {
        applicationCache.onerror();
    }
}

onload = function(e) {
    // Check for required browser features
    if (!window.applicationCache) {
        log("HTML5 Offline Applications are not supported in your browser.");
        return;
    }

    if (!navigator.geolocation) {
        log("HTML5 Geolocation is not supported in your browser.");
        return;
    }

    if (!window.localStorage) {
        log("HTML5 Local Storage is not supported in your browser.");
        return;
    }


    log("Initial cache status: " + showCacheStatus(window.applicationCache.status));
    document.getElementById("installButton").onclick = install;

    // Synchronize with the server if the browser is now online
    if(navigator.onLine) {
        uploadLocations();
    }
}

