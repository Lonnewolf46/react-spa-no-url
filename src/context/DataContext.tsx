import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { decryptData } from '../data/info_fetching'

type DataContextType = {
    decryptedData: unknown
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
    const [decryptedData, setDecryptedData] = useState<unknown>(null)


    useEffect(() => {
        console.log('DataProvider effect running')
        const handleMessage = (event: MessageEvent) => {
            console.log('EVENT ORIGIN DETECTED ON', event.origin)

            if (
                event.origin !== 'https://portalcc.medismart.net' ||
                !event.data ||
                typeof event.data !== 'object'
            ) {
                console.log(
                    "Ignore messages from unknown origins. Content won't be decoded"
                )

                return
            }
            const { action, data: key } = event.data

            if (action !== 'init') {
                return
            }
            console.log('Key received from parent:', key)

            fetch(
                'https://raw.githubusercontent.com/Lonnewolf46/lonnewolf46.github.io/refs/heads/main/data.txt',
                { cache: 'no-store' }
            )
                .then(async (response) => {
                    console.log('FETCH STATUS:', response.status)
                    console.log('FETCH OK:', response.ok)

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`)
                    }

                    const text = await response.text()

                    console.log('FETCHED TEXT LENGTH:', text.length)
                    console.log('FETCHED TEXT:', text)

                    return text
                })
                .then(async (storedText) => {
                    console.log('Starting decryption...')

                    const decryptedData = await decryptData(storedText, key)

                    console.log('DECRYPTED DATA:', decryptedData)

                    setDecryptedData(decryptedData)
                })

                .catch((error) => {
                    console.error('FETCH/DECRYPT ERROR:', error)
                })
        }
        window.addEventListener('message', handleMessage)

        window.parent.postMessage(
            { action: 'ready' },
            'https://portalcc.medismart.net'
        )
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    return (
        <DataContext.Provider value={{ decryptedData }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)

    if (!context) {
        throw new Error('useData must be used inside DataProvider')
    }

    return context
}
