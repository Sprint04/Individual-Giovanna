import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object SLQserver {

    var bd: JdbcTemplate? = null
        get() {
            if (field == null){
                val dataSource = BasicDataSource()

                dataSource.driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
                dataSource.url = "jdbc:sqlserver://52.45.132.234;database=trackware;encrypt=false;trustServerCertificate=false"
                dataSource.username = "sa"
                dataSource.password = "#Gfsptech"

                val bd = JdbcTemplate(dataSource)
                field = bd
            }
            return field
        }

    fun iniciarSQL():JdbcTemplate{
        return bd!!
    }

}