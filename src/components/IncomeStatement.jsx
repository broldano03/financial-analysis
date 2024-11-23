import { useState } from "react"

export const IncomeStatement = () => {
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
    parseFloat(formData.ingresosVentas || 0) - parseFloat(formData.costoVentas || 0);

    const calcularUtilidadOperativa = () =>
    calcularUtilidadBruta() -
    (parseFloat(formData.gastosVenta || 0) +
        parseFloat(formData.gastosAdministrativos || 0) +
        parseFloat(formData.gastosInvestigacion || 0));

    const calcularUtilidadAntesImpuestos = () =>
    calcularUtilidadOperativa() +
    parseFloat(formData.ingresosFinancieros || 0) -
    parseFloat(formData.gastosFinancieros || 0);

    const calcularUtilidadNeta = () =>
    calcularUtilidadAntesImpuestos() - parseFloat(formData.impuestos || 0);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Estado de Resultados:", {
        ...formData,
        utilidadBruta: calcularUtilidadBruta(),
        utilidadOperativa: calcularUtilidadOperativa(),
        utilidadAntesImpuestos: calcularUtilidadAntesImpuestos(),
        utilidadNeta: calcularUtilidadNeta(),
    });
    // Aquí puedes enviar los datos a una API o procesarlos.
    };

    return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-2">Estado de Resultados</h1>
        <p className="text-sm text-center mb-6">Traslada la información de tu Estado Financiero y coloca los datos aquí para obtener tu análisis financiero.</p>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Ingresos o Ventas */}
            <div>
            <label htmlFor="ingresosVentas" className="block text-sm font-medium text-gray-700">
                Ingresos o Ventas
            </label>
            <input
                type="number"
                name="ingresosVentas"
                id="ingresosVentas"
                value={formData.ingresosVentas}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Total de ingresos"
            />
            </div>
            {/* Costo de Ventas */}
            <div>
            <label htmlFor="costoVentas" className="block text-sm font-medium text-gray-700">
                Costo de Ventas
            </label>
            <input
                type="number"
                name="costoVentas"
                id="costoVentas"
                value={formData.costoVentas}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Costo directo de ventas"
            />
            </div>
            {/* Utilidad Bruta */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Utilidad Bruta</label>
            <input
                type="number"
                value={calcularUtilidadBruta()}
                readOnly
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            </div>
            {/* Gastos de Venta */}
            <div>
            <label htmlFor="gastosVenta" className="block text-sm font-medium text-gray-700">
                Gastos de Venta y Distribución
            </label>
            <input
                type="number"
                name="gastosVenta"
                id="gastosVenta"
                value={formData.gastosVenta}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Gastos de comercialización"
            />
            </div>
            {/* Gastos Administrativos */}
            <div>
            <label
                htmlFor="gastosAdministrativos"
                className="block text-sm font-medium text-gray-700"
            >
                Gastos Administrativos
            </label>
            <input
                type="number"
                name="gastosAdministrativos"
                id="gastosAdministrativos"
                value={formData.gastosAdministrativos}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Gastos generales de administración"
            />
            </div>
            {/* Gastos de Investigación */}
            <div>
            <label
                htmlFor="gastosInvestigacion"
                className="block text-sm font-medium text-gray-700"
            >
                Gastos de Investigación y Desarrollo
            </label>
            <input
                type="number"
                name="gastosInvestigacion"
                id="gastosInvestigacion"
                value={formData.gastosInvestigacion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Costos de desarrollo"
            />
            </div>
            {/* Utilidad Operativa */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Utilidad Operativa (EBITDA)</label>
            <input
                type="number"
                value={calcularUtilidadOperativa()}
                readOnly
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            </div>
            {/* Ingresos Financieros */}
            <div>
            <label htmlFor="ingresosFinancieros" className="block text-sm font-medium text-gray-700">
                Ingresos Financieros
            </label>
            <input
                type="number"
                name="ingresosFinancieros"
                id="ingresosFinancieros"
                value={formData.ingresosFinancieros}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Ingresos por inversiones"
            />
            </div>
            {/* Gastos Financieros */}
            <div>
            <label htmlFor="gastosFinancieros" className="block text-sm font-medium text-gray-700">
                Gastos Financieros
            </label>
            <input
                type="number"
                name="gastosFinancieros"
                id="gastosFinancieros"
                value={formData.gastosFinancieros}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Intereses pagados"
            />
            </div>
            {/* Utilidad Antes de Impuestos */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Utilidad Antes de Impuestos</label>
            <input
                type="number"
                value={calcularUtilidadAntesImpuestos()}
                readOnly
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            </div>
            {/* Impuestos */}
            <div>
            <label htmlFor="impuestos" className="block text-sm font-medium text-gray-700">
                Impuestos sobre la Renta
            </label>
            <input
                type="number"
                name="impuestos"
                id="impuestos"
                value={formData.impuestos}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Monto de impuestos"
            />
            </div>
            {/* Utilidad Neta */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Utilidad Neta</label>
            <input
                type="number"
                value={calcularUtilidadNeta()}
                readOnly
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            </div>
        </div>
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
