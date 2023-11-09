import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import kotlin.concurrent.thread

class Repositorio {
    lateinit var bd: JdbcTemplate

    fun iniciar(){
        bd = Conexao.bd!!
    }

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
        insert into acesso(fkUsuario, fkDispositivo, fkLog) value
        (${sistema.idUser}, ${pc.idDispositivo}, 1)
        """)
    }
    fun insertDadosCPU(pc:Computador, dados:CPU){
        bd!!.execute("""
            insert into dados_cpu(nomeCPU,porcentagemUsoCPU, dataHoraCaptura, fkDispositivo) value
	            ('${dados.nomeCPU}', ${dados.porcentagemUsoCPU}, '${dados.dataHoraCaptura}', ${pc.idDispositivo});
        """)
    }


}
