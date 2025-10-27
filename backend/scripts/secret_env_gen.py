import os
import secrets
import string
from pathlib import Path


def generate_secret(length: int = 64) -> str:
    alphabet = string.ascii_letters + string.digits + "_-!@#$%^&*"
    return f'"{"".join(secrets.choice(alphabet) for _ in range(length))}"'


def generate_jwt_secret() -> str:
    return f'"{secrets.token_urlsafe(64)}"'


def process_env_file(env_path: Path) -> str:
    if not env_path.exists():
        raise FileNotFoundError(f"File {env_path} not found")

    new_lines = []
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()

            if not line or line.startswith("#"):
                new_lines.append(line)
                continue

            if "=" in line:
                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip()

                if "SECRET" in key.upper():
                    if "JWT" in key.upper():
                        new_value = generate_jwt_secret()
                    else:
                        new_value = generate_secret()

                    new_lines.append(f"{key}={new_value}")
                    print(f"Updated: {key} = {new_value}")
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)

    return "\n".join(new_lines)


def main():
    script_dir = Path(__file__).parent
    env_path = script_dir / ".." / ".." / ".env"
    env_path = env_path.resolve()

    print(f"Looking for .env at: {env_path}")

    try:
        new_content = process_env_file(env_path)

        backup_path = env_path.with_suffix(".backup")
        if not backup_path.exists():
            os.rename(env_path, backup_path)
            print(f"Backup created: {backup_path}")

        with open(env_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        print("Success")

    except FileNotFoundError as e:
        print(f"Error: {e}")
        print("Please make sure the .env file exists in the parent directory")
    except Exception as e:
        print(f"Unexpected error: {e}")


if __name__ == "__main__":
    main()
