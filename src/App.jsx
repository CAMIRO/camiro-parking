import './App.css'
import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const App = () => {
  const [placa, setPlaca] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [estancia, setEstancia] = useState([]);
  const [pagosResidentes, setPagosResidentes] = useState([]);

  const handlePlacaChange = e => {
    setPlaca(e.target.value);
  };

  const handleTipoVehiculoChange = e => {
    setTipoVehiculo(e.target.value);
  };

  const registrarEntrada = () => {
    const newEstancia = { placa, tipoVehiculo, horaEntrada: new Date() };
    setEstancia([...estancia, newEstancia]);
  };

  const registrarSalida = placa => {
    const newEstancia = estancia.find(e => e.placa === placa)
    newEstancia.horaSalida = new Date();
    const index = estancia.findIndex(e => e.placa === placa);
    const newEstancias = [...estancia];
    newEstancias[index] = newEstancia;
    setEstancia(newEstancias);
  };

  const registrarPago = placa => {
    const estanciaPago = estancia.find(e => e.placa === placa);
    const diferencia = estanciaPago.horaSalida - estanciaPago.horaEntrada;
    const importe = diferencia / 1000 / 60 * 0.5;
    const newPagosResidentes = [...pagosResidentes];
    newPagosResidentes.push({ placa, importe });
    setPagosResidentes(newPagosResidentes);
  };

  const darAltaVehiculoOficial = () => {
    const newEstancia = { placa, tipoVehiculo };
    setEstancia([...estancia, newEstancia]);
  };

  const darAltaVehiculoResidente = () => {
    const newPagosResidentes = [...pagosResidentes];
    newPagosResidentes.push({ placa });
    setPagosResidentes(newPagosResidentes);
  };

  const comienzaMes = () => {
    const newEstancias = estancia.filter(e => e.tipoVehiculo !== 'oficial');
    setEstancia(newEstancias);
    setPagosResidentes([]);
  };

  const generarInformePagosResidentes = () => {
    const informe = pagosResidentes.map(pago => {
      const estanciaPago = estancia.find(e => e.placa === pago.placa);
      const horasEstacionado = (estanciaPago.horaSalida - estanciaPago.horaEntrada) / 1000 / 60 / 60;
      const totalAPagar = horasEstacionado * 0.05;
      return { ...pago, horasEstacionado, totalAPagar }
    });
    return informe;
  };

  return (
    <main >
      <h2>Registro de entrada/salida de vehiculos</h2>
      <body>
      <Form>
        <Form.Group>
          <Form.Label>Placa</Form.Label>
          <Form.Control type="text" value={placa} onChange={handlePlacaChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo de vehiculo</Form.Label>
          <Form.Control as="select" value={tipoVehiculo} onChange={handleTipoVehiculoChange}>
            <option value="">-- Seleccione --</option>
            <option value="oficial">Oficial</option>
            <option value="residente">Residente</option>
            <option value="noResidente">No residente</option>
          </Form.Control>
        </Form.Group>
        <Button onClick={registrarEntrada}>Registrar Entrada</Button>
        <Button onClick={darAltaVehiculoOficial}>Dar de alta vehiculo oficial</Button>
        <Button onClick={darAltaVehiculoResidente}>Dar de alta vehiculo de residente</Button>
        <Button onClick={comienzaMes}>Comienza mes</Button>
        <Button onClick={generarInformePagosResidentes}>Generar informe de pagos de residentes</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Tipo Vehiculo</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estancia.map(e => (
            <tr key={e.placa}>
              <td>{e.placa}</td>
              <td>{e.tipoVehiculo}</td>
              <td>{e.horaEntrada.toLocaleString()}</td>
              <td>{e.horaSalida ? e.horaSalida.toLocaleString() : '-'}</td>
              <td>
                {e.horaSalida ? 
                  <Button onClick={() => registrarPago(e.placa)}>Registrar Pago</Button>
                :
                  <Button onClick={() => registrarSalida(e.placa)}>Registrar Salida</Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </body>
    </main>
  );
};

export default App;