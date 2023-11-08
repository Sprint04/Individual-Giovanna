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

    val dataHoraCaptura = LocalDateTime.now() // Captura a data e hora atual

    println("Informações da CPU:")
    println("Nome: ${processador.nome}")

    // Imprime a data e hora da captura no formato desejado (por exemplo, "dd/MM/yyyy HH:mm:ss").
    val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))
    println("Data e Hora da Captura: $dataFormatada")
}

fun capturarPorcentagemDeUsoDaCPU() {
    val looca = Looca()
    val timer = Timer()
    val informacao = CPU()

    val task = object : TimerTask() {
        override fun run() {
            val processador = looca.processador
            val porcentagemUso = processador.uso
            val porcentagemArredondada = String.format("%.0f", porcentagemUso)

            informacao.porcentagemUsoCPU = porcentagemArredondada

            val dataHoraCaptura = LocalDateTime.now()
            val dataFormatada = dataHoraCaptura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))

            informacao.dataHoraCaptura

            println("Uso da CPU: $porcentagemArredondada%")
            println("Data e Hora da Captura: $dataFormatada")

        }
    }

}


