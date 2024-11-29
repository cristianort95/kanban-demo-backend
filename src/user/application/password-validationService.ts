import bcrypt from "bcrypt";

export class PasswordValidationService {
    private saltRounds = 10;

    validate(password: string): void {
        if (password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres.");
        }

        if (!/[A-Z]/.test(password)) {
            throw new Error("La contraseña debe contener al menos una letra mayúscula.");
        }

        if (!/[a-z]/.test(password)) {
            throw new Error("La contraseña debe contener al menos una letra minúscula.");
        }

        if (!/[0-9]/.test(password)) {
            throw new Error("La contraseña debe contener al menos un número.");
        }

        if (!/[!@#$%^&*]/.test(password)) {
            throw new Error("La contraseña debe contener al menos un carácter especial (!@#$%^&*).");
        }
    }

    async validateAndHash(password: string): Promise<string> {
        this.validate(password);
        return await bcrypt.hash(password, this.saltRounds);
    }
}
