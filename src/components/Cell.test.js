import {fireEvent, render, screen} from "@testing-library/react";
import Cell from "./Cell";

describe('Cell Component', () => {
  test('renders with the correct value', () => {
    render(<Cell value='1' makeMove={() => {}} disabled={false} />);
    expect(screen.getByRole('button')).toHaveTextContent('1');
  });

  test('button is disabled when disabled prop is true', () => {
    render(<Cell value='1' makeMove={()=>{}} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  })

  test('calls makeMove function on click when not disabled', () => {
    const makeMoveMock = jest.fn();

    render(<Cell value='1' makeMove={makeMoveMock} disabled={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(makeMoveMock).toBeCalledTimes(1);
  });

  test('does not call makeMove function on click when disabled', () => {
    const makeMoveMock = jest.fn();

    render(<Cell value='1' makeMove={makeMoveMock} disabled={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(makeMoveMock).not.toHaveBeenCalled();
  });
})