const express = require('express')
const userController = require('../controllers/userController')
const publicLocationController = require('../controllers/PublicLocationController')
const privateLocationController = require('../controllers/PrivateLocationController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

const router = new express.Router()

// register : post requset to http://localhost:3000/register
router.post(`/register`,userController.registerController)
// login : post requset to http://localhost:3000/login
router.post(`/login`,userController.loginController)
// add project : post requset to http://localhost:3000/add-location
router.post('/add-publiclocation',jwtMiddleware, multerMiddleware.fields([{ name: 'locationImg', maxCount: 1 }, { name: 'locationVideo', maxCount: 1 }]), publicLocationController.publicLocationController);
// add project : post requset to http://localhost:3000/add-location
router.post('/add-privatelocation',jwtMiddleware, multerMiddleware.fields([{ name: 'locationImg', maxCount: 1 }, { name: 'locationVideo', maxCount: 1 }]), privateLocationController.privateLocationController);
// homelocations : post requset to http://localhost:3000/homelocation
router.get(`/homelocation`, publicLocationController.gethomeLocationController)
// allpubliclocation : get requset to http://localhost:3000/all-publiclocation
router.get('/all-publiclocation',jwtMiddleware,publicLocationController.getAllPublicLocationController)
// allpubliclocation : get requset to http://localhost:3000/all-privatelocation
router.get('/all-privatelocation',jwtMiddleware,privateLocationController.getAllPrivateLocationController)
// privatelocations : get requset to http://localhost:3000/user-publiclocations
router.get('/user-publiclocations',jwtMiddleware,publicLocationController.getUserPublicLocationController)
// privatelocations : get requset to http://localhost:3000/user-privatelocations
router.get('/user-privatelocations',jwtMiddleware,privateLocationController.getUserPrivateLocationController)
// removepubliclocation : delete requset to http://localhost:3000/pid/remove-publiclocation
router.delete('/:pid/remove-publiclocation',jwtMiddleware,publicLocationController.removePublicLocationController)
// removeprivatelocation : delete requset to http://localhost:3000/pid/remove-privatelocation
router.delete('/:pid/remove-privatelocation',jwtMiddleware,privateLocationController.removePrivateLocationController)
// editpubliclocations : put requset to http://localhost:3000/pid/edit-publiclocations
router.put('/:pid/edit-publiclocations',jwtMiddleware,multerMiddleware.fields([{ name: 'locationImg', maxCount: 1 }, { name: 'locationVideo', maxCount: 1 }]),publicLocationController.editPubliclocationController)
// editprivatelocations : put requset to http://localhost:3000/pid/edit-privatelocations
router.put('/:pid/edit-privatelocations',jwtMiddleware,multerMiddleware.fields([{ name: 'locationImg', maxCount: 1 }, { name: 'locationVideo', maxCount: 1 }]),privateLocationController.editPrivateLocationController)

// export router
module.exports = router