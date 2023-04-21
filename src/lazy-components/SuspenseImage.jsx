function createResource(asyncFn) {
    var status = "pending";
    var result;
    var promise = asyncFn().then(function (r) {
        status = "success";
        result = r;
    }, function (e) {
        status = "error";
        result = e;
    });

    return {
        read: function () {
            switch (status) {
                case "pending":
                    throw promise;
                case "error":
                    throw result;
                case "success":
                    return result;
            }
        }
    };
}

var cache = new Map();

function loadImage(source) {
    var resource = cache.get(source);
    if (resource)
        return resource;
    resource = createResource(function () {
        return new Promise(function (resolve, reject) {
            var img = new window.Image();
            img.src = source;
            img.addEventListener("load", function () { return resolve(source); });
            img.addEventListener("error", function () {
                return reject(new Error("Failed to load image ".concat(source)));
            });
        });
    });
    cache.set(source, resource);
    return resource;
}

function SuspenseImage(props) {
    loadImage(props.src).read();
    return <img {...props} alt="" />;
}

export default SuspenseImage;
