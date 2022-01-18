
const esAdministrador = true
function checkAdmin(req,res,next){

    if(!esAdministrador) return res.json({ error: 'No tiene Permiso de acceso' , descripcion: `No tiene permiso a la ruta  ${req.originalUrl}`, code: '403'})

    return next()
}


module.exports = checkAdmin