import json
import os.path


def get_boolean_input(prompt):
    while True:
        user_input = input(prompt).lower()
        if user_input == "y":
            return True
        elif user_input == "n":
            return False
        else:
            print("Try again. Please enter 'y' or 'n'.")


def check_empty_input(prompt):
    while True:
        user_input = input(prompt)
        if user_input == "":
            print("Try again. Please enter a value.")
        else:
            return user_input


def main():
    package_id = check_empty_input("Enter package ID: ")
    name = check_empty_input("Enter name: ")
    icon_url = check_empty_input("Enter icon URL: ")
    device_integrity = get_boolean_input("Requires Device Integrity (y/n): ")
    strong_integrity = get_boolean_input("Requires Strong Integrity (y/n): ")
    root_check = get_boolean_input("Has root check (y/n): ")
    bootloader_check = get_boolean_input("Has bootloader check (y/n): ")

    data = {
        "packageId": package_id,
        "name": name,
        "iconURL": icon_url,
        "deviceIntegrity": device_integrity,
        "strongIntegrity": strong_integrity,
        "rootCheck": root_check,
        "bootloaderCheck": bootloader_check,
    }

    json_path = f"public/data/{package_id}"

    if os.path.exists(json_path):
        print("App already exists. Overwriting...")

    json_data = json.dumps(data, indent=2)

    with open(json_path, "w") as f:
        f.write(json_data)
        f.write("\n")

    # Add to apps.json for indexing
    appDict = {}

    with open("public/data/apps.json", "r") as f:
        appDict = json.load(f)
        appDict[package_id] = name

    if appDict:
        with open("public/data/apps.json", "w") as f:
            json.dump(appDict, f, indent=2)
            f.write("\n")


if __name__ == "__main__":
    main()
