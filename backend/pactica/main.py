import tkinter as tk
from tkinter import ttk


class WeightConverter(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Использование стандартных элементов управления")
        self.geometry("600x300")

        # --- Ввод ---
        lbl = tk.Label(self, text="Введите значение веса в граммах:")
        lbl.grid(row=0, column=0, sticky="w", padx=10, pady=5)

        self.entry = tk.Entry(self)
        self.entry.insert(0, "10")
        self.entry.grid(row=1, column=0, padx=10, sticky="we")

        # --- Результат ---
        self.result = tk.Text(self, height=4, width=40)
        self.result.grid(row=0, column=1, rowspan=3, padx=10, pady=5)
        self.result.configure(state="disabled")

        # --- Список единиц ---
        self.units = tk.Listbox(self, height=5)
        for u in ["Фунт", "Пуд", "Унция", "Драхм", "Гран"]:
            self.units.insert(tk.END, u)
        self.units.selection_set(0)
        self.units.grid(row=2, column=0, padx=10, pady=5, sticky="we")

        # --- Режим расчета ---
        frame_mode = ttk.LabelFrame(self, text="Режим расчета")
        frame_mode.grid(row=3, column=0, padx=10, pady=5, sticky="we")

        self.mode = tk.StringVar(value="single")
        tk.Radiobutton(
            frame_mode, text="Единичный расчет", variable=self.mode, value="single"
        ).pack(anchor="w")
        tk.Radiobutton(
            frame_mode, text="Расчет для интервала", variable=self.mode, value="range"
        ).pack(anchor="w")

        # --- Настройки редактора ---
        frame_editor = ttk.LabelFrame(self, text="Настройка редактора")
        frame_editor.grid(row=3, column=1, padx=10, pady=5, sticky="we")

        self.is_italic = tk.BooleanVar(value=True)
        self.is_red = tk.BooleanVar(value=True)
        tk.Checkbutton(
            frame_editor,
            text="Стиль курсив",
            variable=self.is_italic,
            command=self.calculate,
        ).pack(anchor="w")
        tk.Checkbutton(
            frame_editor,
            text="Цвет красный",
            variable=self.is_red,
            command=self.calculate,
        ).pack(anchor="w")

        # --- События ---
        self.entry.bind("<KeyRelease>", lambda e: self.calculate())
        self.units.bind("<<ListboxSelect>>", lambda e: self.calculate())

        self.calculate()

    def calculate(self):
        text_val = self.entry.get()
        try:
            grams = float(text_val)
        except ValueError:
            self.show_result("Некорректный ввод")
            return

        try:
            unit = self.units.get(self.units.curselection())
        except:
            unit = "Фунт"

        value = self.convert(grams, unit)
        result_text = f"{grams} граммов = {value:.3f} {unit}"
        self.show_result(result_text)

    def show_result(self, text):
        self.result.configure(state="normal")
        self.result.delete("1.0", tk.END)

        font_style = (
            ("Arial", 11, "italic") if self.is_italic.get() else ("Arial", 11, "normal")
        )
        self.result.tag_configure(
            "styled",
            foreground="red" if self.is_red.get() else "black",
            font=font_style,
        )
        self.result.insert(tk.END, text, "styled")

        self.result.configure(state="disabled")

    def convert(self, grams, unit):
        conversions = {
            "Фунт": grams / 453.592,
            "Пуд": grams / 16380.496,
            "Унция": grams / 28.3495,
            "Драхм": grams / 1.77185,
            "Гран": grams / 0.0647989,
        }
        return conversions.get(unit, 0.0)


if __name__ == "__main__":
    app = WeightConverter()
    app.mainloop()
