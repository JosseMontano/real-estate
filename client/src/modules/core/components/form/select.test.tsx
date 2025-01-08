import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CustomSelect from "./select";

describe("Select", () => {
  const options = [
    { name: { es: "Opción 1", en: "Option 1", pt: "Opção 1" }, id: 1 },
    { name: { es: "Opción 2", en: "Option 2", pt: "Opção 2" }, id: 2 },
  ];

  const handleChange = vi.fn();

  beforeEach(() => {
    render(
      <CustomSelect
        value=""
        onChange={handleChange}
        options={options}
        showAll={true}
      />
    );
  });

  afterEach(cleanup);

  test("Debe renderizar correctamente y mostrar opciones cuando es clickeado", () => {
    expect(screen.getByText(/Seleccionar/i)).toBeDefined();

    const selectElement = screen.getByText(/Seleccionar/i);
    fireEvent.click(selectElement);

    // Verificar que las opciones aparecen después de abrir el dropdown
    expect(screen.getByText("Opción 1")).toBeDefined();
    expect(screen.getByText("Opción 2")).toBeDefined();
  });

  test("Debe llamar a onChange con la opción correcta cuando se hace clic en una opción", () => {
    const selectElement = screen.getByText(/Seleccionar/i);
    fireEvent.click(selectElement);

    const optionElement = screen.getByText("Opción 1");
    fireEvent.click(optionElement);

    expect(handleChange).toHaveBeenCalledWith(options[0]);
  });

  test('Debe mostrar la opción "Todos" cuando showAll sea verdadero', () => {
    const selectElement = screen.getByText(/Seleccionar/i);
    fireEvent.click(selectElement);

    expect(screen.getByText(/Todos/i)).toBeDefined();
  });
});
