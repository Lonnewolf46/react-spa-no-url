const IV_LENGTH = 12;

export function base64ToBytes(
    base64: string
): Uint8Array<ArrayBuffer> {
    const binary = atob(base64);
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

export async function getAESKey(keyString: string): Promise<CryptoKey> {
    let keyBytes;
    try {
        keyBytes =
            base64ToBytes(keyString);
    } catch {
        throw new Error(
            "The encryption key is not valid Base64."
        );
    }

    if (keyBytes.length !== 32) {
        throw new Error(
            "The encryption key must be 32 bytes (256 bits)."
        );
    }


    return await crypto.subtle.importKey(
        "raw",
        keyBytes,
        {
            name: "AES-GCM"
        },
        false,
        [
            "encrypt",
            "decrypt"
        ]
    );
}

export async function decryptData(text: string, key: string): Promise<JSON> {
    try {
        const encryptedText = text

        if (!encryptedText) {
            throw new Error(
                "No ciphertext to decrypt."
            );
        }

        let encryptedBytes;
        try {
            encryptedBytes =
                base64ToBytes(encryptedText);
        } catch {
            throw new Error(
                "The ciphertext is not valid Base64."
            );
        }

        /*
        Check minimum size.
        */
        if (
            encryptedBytes.length <= IV_LENGTH
        ) {

            throw new Error(
                "The ciphertext is too short."
            );
        }

        /*
        Extract IV.
        */
        const iv =
            encryptedBytes.slice(
                0,
                IV_LENGTH
            );

        /*
        Extract ciphertext.
        */
        const ciphertext =
            encryptedBytes.slice(
                IV_LENGTH
            );

        /*
        Get AES key.
        */
        const aesKey = await getAESKey(key);

        /*
        Decrypt.
        */
        const decrypted =
            await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                    tagLength: 128
                },
                aesKey,
                ciphertext
            );

        /*
        Convert to text.
        */
        const jsonText =
            new TextDecoder()
                .decode(decrypted);

        /*
        Parse JSON.
        */
        const jsonObject =
            JSON.parse(jsonText);

        return jsonObject

    } catch (error) {
        console.error(error);
        return JSON.parse("")
    }
}