var pool = require('./bd');

async function getNovedad(){

    var query = "select * from novedades";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj){
    try {
        var query ="insert into novedades set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id){
    var query = "delete from novedades where id = ?";
    var rows = await pool.query(query,[id]);
    return rows;
}

async function getNovedadByID(id){
    var query = "select * from novedades where id= ?";
    var rows = await pool.query(query,[id]);
    return rows[0];

}

async function modificarNovedadByID(obj,id){
    try {
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj,id]);
        return rows;
        
    } catch (error) {
        throw error;
    }
}
async function Buscar(busqueda){
    var query="select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ?";
    var rows = await pool.query(query,['%' + busqueda +'%','%' + busqueda +'%','%' + busqueda +'%' ]);
    return rows;
}

module.exports = {getNovedad, insertNovedad, deleteNovedadById, getNovedadByID, modificarNovedadByID, Buscar}