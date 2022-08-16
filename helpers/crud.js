export function create(params, Model) {
    return new Promise((resolve, reject) => {
        const toCreate = new Model(params);
        toCreate.save()
            .then(newResult => {
                resolve(newResult);
            })
            .catch(err => reject(err));
    });
}

export function createMany(params, Model) {
    return new Promise((resolve, reject) => {
        Model.insertMany(params).then(() => {
            resolve(params);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function findOne(params, Model) {
    return new Promise((resolve, reject) => {
        Model.findOne(params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
}

export function find(params, Model) {
    return new Promise((resolve, reject) => {
        Model.find(params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
}

export function updateById(params, Model) {
    return new Promise((resolve, reject) => {
        try {
            Model.findByIdAndUpdate(user._id, params)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
}

export function deleteOne(params, Model) {
    return new Promise((resolve, reject) => {
        Model.deleteOne(params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
}

export function deleteMany(params, Model) {
    return new Promise((resolve, reject) => {
        Model.deleteMany(params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
}