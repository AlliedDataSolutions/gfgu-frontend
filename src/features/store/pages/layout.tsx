import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fresh Farm Market",
  description: "Farm-fresh groceries delivered to your doorstep",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <a href="/" className="font-bold text-xl text-green-600">
              Fresh Farm Market
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="hover:text-green-600">
                Home
              </a>
              <a href="/products" className="hover:text-green-600">
                Products
              </a>
              <a href="/cart" className="hover:text-green-600">
                Cart
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-12 bg-green-50">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">About Us</h3>
                <p className="text-sm text-muted-foreground">
                  Fresh Farm Market connects local farmers with consumers, bringing you the freshest produce straight
                  from the farm.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Our Farmers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Delivery Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Subscribe to receive updates on fresh arrivals and special offers.
                </p>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="px-3 py-2 border rounded-l-md w-full" />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-r-md">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Fresh Farm Market. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

  