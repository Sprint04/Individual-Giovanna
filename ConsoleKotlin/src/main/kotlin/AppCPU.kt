import com.github.britooo.looca.api.core.Looca
import java.util.Timer
import java.util.TimerTask
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun capturarDadosDeCPU() {
    val looca = Looca()
    val processador = looca.processador

    val informacao = CPU()
    informacao.nomeCPU = processador.nome

    println("Informações da CPU:")
    println("Nome: ${processador.nome}")

}

fun capturarPorcentagemDeUsoDaCPU(bd: Repositorio, pc: Computador) {
    val looca = Looca()
    val timer = Timer()
    val informacao = CPU()

    val task = object : TimerTask() {
        override fun run() {
            val processador = looca.processador
            val porcentagemUso = processador.uso
            val porcentagemArredondada = String.format("%.2f", porcentagemUso)

            informacao.nomeCPU = processador.nome
            informacao.porcentagemUsoCPU = porcentagemUso
            informacao.dataHoraCaptura = LocalDateTime.now()

            println("Uso da CPU: $porcentagemArredondada%")
            println("Data e Hora da Captura: ${informacao.dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))}")

            bd.insertDadosCPU(pc, informacao)
        }
    }

    timer.schedule(task, 0, 10000)
}

