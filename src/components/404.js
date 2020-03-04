import { Link } from '@reach/router'
import React from 'react'

export default function NotFound () {
    return (
        <div className="bg-gray-700 flex flex-col items-center text-gray-100 p-5">
            <p>Maaf, halaman yang Anda cari tidak ditemukan</p>
            <p>Kembali ke <Link to='/' className="italic">Halaman Utama</Link></p>
        </div>
    )
}