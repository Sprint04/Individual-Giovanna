import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.time.format.DateTimeFormatter
import kotlin.concurrent.thread

class Repositorio {

    var bd: JdbcTemplate = SLQserver.iniciarSQL()

    fun computador(ip:String):List<Computador>{
        val comp:List<Computador> = bd.query("""
            select * from dispositivo
                where ip = '$ip' 
        """,
            BeanPropertyRowMapper(Computador::class.java))
        return comp
    }
    fun Usuarios(pc: Computador):List<Usuario>{
        val user:List<Usuario> = bd.query("""
            select idUsuario, u.nome, email_Corporativo as email, senha, c.nome as cargo from usuario as u
	            join empresa on u.fkEmpresa = idEmpresa 
		            join dispositivo as d on d.fkEmpresa = idEmpresa
                        join cargo as c on fkCargo = idCargo
			                where u.fkEmpresa = ${pc.fkempresa};
        """,
            BeanPropertyRowMapper(Usuario::class.java))
        return user
    }
    fun acessoLog(sistema:Sistema, pc: Computador){
        bd.execute("""
        insert into acesso(fkUsuario, fkDispositivo, fkLog) values
        (${sistema.idUser}, ${pc.idDispositivo}, 1)
        """)
    }
    fun insertDadosCPU(pc:Computador, dados:CPU){

        var data = dados.dataHoraCaptura.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        bd!!.execute("""
            insert into dados_cpu(nomeCPU, porcentagemUsoCPU, dataHoraCaptura, fkDispositivo) values
	            ('${dados.nomeCPU}', ${dados.porcentagemUsoCPU}, '$data', ${pc.idDispositivo})
        """)
    }


}
