import com.github.britooo.looca.api.core.Looca
import java.util.Timer
import java.util.TimerTask
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun capturarDadosDeCPU() {
    val looca = Looca()
    val processador = looca.processador
    val dataHoraCaptura = LocalDateTime.now() // Captura a data e hora atual

    println("Informações da CPU:")
    println("Fabricante: ${processador.fabricante}")
    println("Nome: ${processador.nome}")
    println("Frequência: ${processador.frequencia / 1024 / 1024 / 1024}")

    // Imprime a data e hora da captura no formato desejado (por exemplo, "dd/MM/yyyy HH:mm:ss").
    val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))
    println("Data e Hora da Captura: $dataFormatada")
}

fun capturarPorcentagemDeUsoDaCPU() {
    val looca = Looca()
    val timer = Timer()

    val task = object : TimerTask() {
        override fun run() {
            val processador = looca.processador
            val porcentagemUso = processador.uso
            val porcentagemArredondada = String.format("%.0f", porcentagemUso)

            val dataHoraCaptura = LocalDateTime.now()
            val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))

            println("Uso da CPU: $porcentagemArredondada%")
            println("Data e Hora da Captura: $dataFormatada")
        }
    }

    timer.scheduleAtFixedRate(task, 0, 10000)
}

fun main() {
    capturarDadosDeCPU()
    capturarPorcentagemDeUsoDaCPU()
}

