const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/user.controllers');


const router = Router();         


router.get('/', usuariosGet );
 
router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('role').custom( roleValido ),
  validarCampos
], usuariosPut );

router.post('/', [
  check('user', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( emailExiste ),
  // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( roleValido ),
  validarCampos
], usuariosPost );

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete );



module.exports = router;
