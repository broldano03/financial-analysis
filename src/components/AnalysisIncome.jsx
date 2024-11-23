import React from "react";

const AnalysisIncome = ({ financialData }) => {
  if (!financialData) {
    return (
      <div className="text-center text-gray-500">
        Por favor, ingresa los datos del Estado de Resultados primero.
      </div>
    );
  }

  // Convertir valores a números seguros (manejar nulos o cadenas vacías)
  const toNumber = (value) => parseFloat(value) || 0;

  const ingresosVentas = toNumber(financialData.ingresosVentas);
  const costoVentas = toNumber(financialData.costoVentas);
  const gastosVenta = toNumber(financialData.gastosVenta);
  const gastosAdministrativos = toNumber(financialData.gastosAdministrativos);
  const gastosInvestigacion = toNumber(financialData.gastosInvestigacion);
  const ingresosFinancieros = toNumber(financialData.ingresosFinancieros);
  const gastosFinancieros = toNumber(financialData.gastosFinancieros);
  const impuestos = toNumber(financialData.impuestos);

  // Cálculos intermedios
  const utilidadBruta = ingresosVentas - costoVentas;
  const gastosOperativos = gastosVenta + gastosAdministrativos + gastosInvestigacion;
  const utilidadOperativa = utilidadBruta - gastosOperativos;
  const utilidadAntesImpuestos = utilidadOperativa + ingresosFinancieros - gastosFinancieros;
  const utilidadNeta = utilidadAntesImpuestos - impuestos;

  // Evitar divisiones por cero
  const margenUtilidadBruta = ingresosVentas
    ? (utilidadBruta / ingresosVentas) * 100
    : 0;
  const margenEBITDA = ingresosVentas
    ? (utilidadOperativa / ingresosVentas) * 100
    : 0;
  const margenUtilidadNeta = ingresosVentas
    ? (utilidadNeta / ingresosVentas) * 100
    : 0;
  const razonGastosOperativos = ingresosVentas
    ? (gastosOperativos / ingresosVentas) * 100
    : 0;
  const coberturaIntereses = gastosFinancieros
    ? utilidadOperativa / gastosFinancieros
    : "N/A";

// Interpretaciones actualizadas y enriquecidas
const interpretaciones = {
    margenUtilidadBruta:
      margenUtilidadBruta > 50
        ? "Un margen alto indica una excelente eficiencia en la producción. Esto sugiere que los costos de producción están bien controlados en relación con las ventas. Mantén esta eficiencia revisando regularmente los costos variables y negociando con proveedores para mantener el margen competitivo."
        : "Un margen bajo sugiere problemas con el control de costos de producción. Esto podría deberse a un aumento en el costo de los materiales o la ineficiencia en los procesos. Analiza tu cadena de suministro y busca oportunidades para reducir costos sin comprometer la calidad.",
    
    margenEBITDA:
      margenEBITDA > 20
        ? "La operación principal de la empresa es altamente rentable. Esto refleja un buen control de los gastos operativos. Considera invertir en áreas estratégicas como innovación o expansión para aprovechar esta solidez operativa."
        : "La empresa necesita mejorar la eficiencia operativa. Revisa los gastos administrativos y de ventas para identificar áreas de mejora. Implementar tecnologías que optimicen procesos puede ayudar a mejorar este indicador.",
  
    margenUtilidadNeta:
      margenUtilidadNeta > 10
        ? "La empresa genera buenos beneficios netos en relación a sus ventas, lo cual es una señal positiva para los inversionistas. Mantén este desempeño optimizando la estructura de costos y explorando incentivos fiscales que puedan reducir la carga impositiva."
        : "El margen neto es bajo; revisa los gastos e impuestos. Analiza en detalle los costos financieros y operativos, y busca renegociar deudas o implementar medidas fiscales para mejorar este indicador. También considera estrategias de aumento de precios si el mercado lo permite.",
  
    razonGastosOperativos:
      razonGastosOperativos < 30
        ? "Los gastos operativos están bajo control, lo que refleja una estructura de costos eficiente. Aprovecha este margen para reinvertir en áreas clave como marketing o desarrollo de producto para impulsar el crecimiento."
        : "Los gastos operativos representan una gran proporción de las ventas, lo cual puede limitar la rentabilidad. Realiza una auditoría detallada de estos gastos y evalúa la eliminación de aquellos que no aporten valor directo al cliente.",
  
    coberturaIntereses:
      coberturaIntereses === "N/A"
        ? "La empresa no tiene gastos financieros, lo que es ideal para mantener un flujo de caja positivo. Evalúa si puedes aprovechar financiamiento estratégico para proyectos de expansión sin comprometer tu posición financiera."
        : coberturaIntereses > 3
        ? "La empresa tiene una sólida capacidad para cubrir sus gastos por intereses. Esto es una señal de salud financiera y reduce el riesgo para los acreedores. Considera mantener esta relación al mínimo evitando asumir deudas innecesarias."
        : "La cobertura de intereses es baja; hay riesgo financiero. Esto puede limitar la capacidad de la empresa para cumplir con sus obligaciones financieras. Busca refinanciar deudas para reducir las tasas de interés y prioriza la generación de ingresos para mejorar este indicador.",
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Análisis del Estado de Resultados
      </h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Margen de Utilidad Bruta</h2>
          <p>
            <strong>Cálculo:</strong> {margenUtilidadBruta.toFixed(2)}%
          </p>
          <p className="text-gray-600">{interpretaciones.margenUtilidadBruta}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Margen de Utilidad Operativa (EBITDA)</h2>
          <p>
            <strong>Cálculo:</strong> {margenEBITDA.toFixed(2)}%
          </p>
          <p className="text-gray-600">{interpretaciones.margenEBITDA}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Margen de Utilidad Neta</h2>
          <p>
            <strong>Cálculo:</strong> {margenUtilidadNeta.toFixed(2)}%
          </p>
          <p className="text-gray-600">{interpretaciones.margenUtilidadNeta}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Razón de Gastos Operativos sobre Ventas
          </h2>
          <p>
            <strong>Cálculo:</strong> {razonGastosOperativos.toFixed(2)}%
          </p>
          <p className="text-gray-600">{interpretaciones.razonGastosOperativos}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Índice de Cobertura de Intereses (TIE)
          </h2>
          <p>
            <strong>Cálculo:</strong> {coberturaIntereses}
          </p>
          <p className="text-gray-600">{interpretaciones.coberturaIntereses}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisIncome;
