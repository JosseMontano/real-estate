import { describe, test, expect, vi,beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import use360photo from "@/core/store/360photo";
import { handlePostBlob } from "@/core/utils/fetch";
import Img360 from "./img360";

vi.mock("@/core/store/360photo");
vi.mock("@/core/utils/fetch");

describe("Img360 Component", () => {
  const mockHandlePostBlob = vi.fn();
  const mockUse360photo = {
    url: "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Falejandra8%2Fimg10.jpg?alt=media&token=64afb4e2-59b6-4bdb-ae0e-c55960795990",
  };

  beforeEach(() => {
    vi.mocked(use360photo).mockReturnValue(mockUse360photo);
    vi.mocked(handlePostBlob).mockImplementation(mockHandlePostBlob);
  });

  test("Muestra el componente de carga mientras la imagen se está cargando", async () => {
    mockHandlePostBlob.mockResolvedValueOnce(new Blob());

    render(<Img360 />);

    const loaderElement = screen.getByRole("loader");
    expect(loaderElement).toBeDefined();

    await waitFor(() => expect(mockHandlePostBlob).toHaveBeenCalled());
  });

  test("Muestra la imagen una vez que se carga", async () => {
    const mockBlob = new Blob(["fake image content"], { type: "image/jpeg" });
    mockHandlePostBlob.mockResolvedValueOnce(mockBlob);

    await act(async () => {
      render(<Img360 />);
    });
    const RV = screen.getByRole("RV");
    expect(RV).toBeDefined();
  });

  test("Maneja errores al cargar la imagen", async () => {
    console.error = vi.fn(); // Silenciar errores en la consola
    mockHandlePostBlob.mockRejectedValueOnce(new Error("Fetch error"));

    await act(async () => {
      render(<Img360 />);
    });

    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
    expect(console.error).toHaveBeenCalledWith("Error fetching image:", expect.any(Error));
  }); 
});
