const { nanoid } = require('nanoid');
const _ = require('lodash');

const controller = (languageRepository, errorRepository) => {

    const getLanguageList = async (req, res) => {
        try {
            let cachedLanguages = await languageRepository.getCachedLanguages();
            cachedLanguages = JSON.parse(cachedLanguages)
            if (!_.isEmpty(cachedLanguages)) {
                console.log("Cached languages is not empty.")
                res.status(200).json(cachedLanguages);
                return;
            }
            console.log("Cached languages is empty; getting from database")
            let languages = await languageRepository.getLanguageList();
            await languageRepository.setCachedLanguages(JSON.stringify(languages));

            let languageList = [];
            await languages.forEach(row=>{
                languageList.push(row.englishName + '/' + row.nativeName)
            })
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.status(200).json(languages);
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    const getLanguageInfo = async (req, res) => {
        try {
            let cachedLanguages = await languageRepository.getCachedLanguages();
            cachedLanguages = JSON.parse(cachedLanguages)
            if (!_.isEmpty(cachedLanguages)) {
                for (let language of cachedLanguages) {
                    if (language.languageId == req.params.languageId) {
                        res.status(200).json(language);
                        return;
                    }
                }
                throw {errno: 4000}
            } else {
                let languages = await languageRepository.getLanguageList();
                await languageRepository.setCachedLanguages(JSON.stringify(languages));
                for (let language of languages) {
                    if (language.languageId == req.params.languageId) {
                        res.status(200).json(language);
                        return;
                    }
                }
                throw {errno: 4000}
            }
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    const getModuleList = async (req, res) => {
        try {
            let cachedModules = await languageRepository.getCachedModules(req.params.languageId);
            cachedModules = JSON.parse(cachedModules);
            if (!_.isEmpty(cachedModules)) {
                res.status(200).json({modules: cachedModules});
                return;
            }
            let modules = await languageRepository.getModuleList(req.params.languageId);
            await languageRepository.setCachedModules(req.params.languageId, JSON.stringify(modules));
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            if (modules.length == 0) throw {errno: 1035};
            res.status(200).json({modules: modules});
        } catch (err) {
            res.status(404);
            if (err.errno) {
                res.send(errorRepository(err.errno));
                return;
            }
            res.send(errorRepository(4000));
        }
    }

    const getModuleInfo = async (req, res) => {
        try {
            let cachedModules = await languageRepository.getCachedModules(req.params.moduleId);
            cachedModules = JSON.parse(cachedModules)
            if (!_.isEmpty(cachedModules)) {
                for (let module of cachedModules) {
                    if (module.moduleId == req.params.moduleId) {
                        res.status(200).json(module);
                        return;
                    }
                }
                throw {errno: 4000}
            } else {
                let modules = await languageRepository.getModuleList(req.params.languageId);
                await languageRepository.setCachedModules(req.params.languageId, JSON.stringify(modules));
                for (let module of modules) {
                    if (module.moduleId == req.params.moduleId) {
                        res.status(200).json(module);
                        return;
                    }
                }
                throw {errno: 4000}
            }
        } catch (err) {
            throw err;
        }
    }

    const getItemList = async (req,res) => {
        try {
            let cachedItems = await languageRepository.getCachedModule(req.params.moduleId);
            cachedItems = JSON.parse(cachedItems)
            if (!_.isEmpty(cachedItems)) {
                res.status(200).json({items: cachedItems});
                return;
            }
            let items = await languageRepository.getItemList(req.params.moduleId);
            await languageRepository.setCachedModule(req.params.moduleId, JSON.stringify(items));

            res.set({ 'content-type': 'application/json; charset=utf-8' });
            if (items.length == 0) throw {errno: 1036};
            res.status(200).json({items: items});
        } catch (err) {
            res.status(404);
            if (err.errno) {
                res.send(errorRepository(err.errno));
                return;
            }
            res.send(errorRepository(4000));
        }
    }

    const getItemInfo = async (req, res) => {

    }

    const createItem = async (req, res) => {
        try {
            await languageRepository.createItem([nanoid(8), req.params.moduleId, req.body.native, req.body.english]);
            let userList = await languageRepository.getUsers;
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    return {
        getLanguageList: getLanguageList,
        getLanguageInfo: getLanguageInfo,
        getModuleList: getModuleList,
        getModuleInfo: getModuleInfo,
        getItemList: getItemList,
        getItemInfo: getItemInfo,
        createItem: createItem
    }
}

module.exports = controller;  