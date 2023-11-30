import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {
    var bd: JdbcTemplate? = null
        get() {
            if (field == null){
                val dataSource = BasicDataSource()
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                val serverName = "localhost"
                val mydatabase = "trackware"
                dataSource.url = "jdbc:mysql://$serverName/$mydatabase"
                dataSource.username = "root"
                dataSource.password = "root"
                val bd = JdbcTemplate(dataSource)
                field = bd
            }
            return field
        }

    fun iniciarMYSQL():JdbcTemplate{
        return bd!!
    }
}

