import { useState } from "react";

export const IncomeStatement = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        ingresosVentas: "",
        costoVentas: "",
        gastosVenta: "",
        gastosAdministrativos: "",
        gastosInvestigacion: "",
        ingresosFinancieros: "",
        gastosFinancieros: "",
        impuestos: "",
      });
    
    const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        };

    const calcularUtilidadBruta = () =>
        (parseFloat(formData.ingresosVentas || 0) -
            parseFloat(formData.costoVentas || 0)).toFixed(2);

    const calcularUtilidadOperativa = () =>
        (parseFloat(calcularUtilidadBruta()) - 
            (parseFloat(formData.gastosVenta || 0) + 
            parseFloat(formData.gastosAdministrativos || 0) +
            parseFloat(formData.gastosInvestigacion || 0))).toFixed(2);

    const calcularUtilidadAntesImpuestos = () =>
        (parseFloat(calcularUtilidadOperativa()) + 
            parseFloat(formData.ingresosFinancieros || 0) - 
            parseFloat(formData.gastosFinancieros || 0)).toFixed(2);

    const calcularUtilidadNeta = () =>
        (parseFloat(calcularUtilidadAntesImpuestos()) - 
            parseFloat(formData.impuestos || 0)).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            utilidadBruta: parseFloat(calcularUtilidadBruta()),
            utilidadOperativa: parseFloat(calcularUtilidadOperativa()),
            utilidadAntesImpuestos: parseFloat(calcularUtilidadAntesImpuestos()),
            utilidadNeta: parseFloat(calcularUtilidadNeta()),
        };
        onSubmit(data); // Pasa los datos calculados al componente padre
    };
    

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-2">Estado de Resultados</h1>
      <p className="text-sm text-center mb-6">
        Traslada la información de tu Estado Financiero y coloca los datos aquí
        para obtener tu análisis financiero.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Campos del formulario */}
          {[
            { name: "ingresosVentas", label: "Ingresos o Ventas", placeholder: "Total de ingresos" },
            { name: "costoVentas", label: "Costo de Ventas", placeholder: "Costo directo de ventas" },
            { name: "gastosVenta", label: "Gastos de Venta y Distribución", placeholder: "Gastos de comercialización" },
            { name: "gastosAdministrativos", label: "Gastos Administrativos", placeholder: "Gastos generales de administración" },
            { name: "gastosInvestigacion", label: "Gastos de Investigación y Desarrollo", placeholder: "Costos de desarrollo" },
            { name: "ingresosFinancieros", label: "Ingresos Financieros", placeholder: "Ingresos por inversiones" },
            { name: "gastosFinancieros", label: "Gastos Financieros", placeholder: "Intereses pagados" },
            { name: "impuestos", label: "Impuestos sobre la Renta", placeholder: "Monto de impuestos" },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Campos calculados */}
          {[
            { label: "Utilidad Bruta", value: calcularUtilidadBruta },
            { label: "Utilidad Operativa (EBITDA)", value: calcularUtilidadOperativa },
            { label: "Utilidad Antes de Impuestos", value: calcularUtilidadAntesImpuestos },
            { label: "Utilidad Neta", value: calcularUtilidadNeta },
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="text"
                value={field.value()}
                readOnly
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          ))}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
