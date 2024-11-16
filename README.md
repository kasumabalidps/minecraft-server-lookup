# Minecraft Server Lookup (MSL)

A modern web application for checking Minecraft server status, built with Next.js 15. Get real-time information about both Java and Bedrock edition servers including player count, version, and more.

![MSL Preview](https://cdn.discordapp.com/attachments/1252643504522399767/1307290535446450199/image.png?ex=6739c4af&is=6738732f&hm=de7695ebac40be3ce93798290db826111087701bdad1901cd24d9e6bbed12033&)

## 🌟 Features

- **Real-time Server Status**: Check the status of any Minecraft server instantly
- **Multi-Edition Support**: Works with both Java and Bedrock edition servers
- **Detailed Information**: View player count, version, MOTD, and more
- **Modern UI**: Clean and responsive design with dark theme
- **API Access**: Public API endpoints for developers
- **Mobile Friendly**: Fully responsive on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **API**: MCStatus.io
- **Language**: JavaScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kasumabalidps/minecraft-server-lookup.git
```

2. Install dependencies:
```bash
cd minecraft-server-lookup
npm install
```

3. Create a `next.config.js` file:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Usage

1. Visit the website
2. Select server edition (Java/Bedrock)
3. Enter server address (e.g., hypixel.net)
4. Click Search to view server status

## 📚 API Documentation

### Base URL
```
https://your-domain.com/api/minecraft
```

### Endpoints

#### Java Edition
```http
GET /api/minecraft/java?url={server_address}
```

#### Bedrock Edition
```http
GET /api/minecraft/bedrock?url={server_address}
```

For detailed API documentation, visit the [API Docs](/api-docs) page.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MCStatus.io](https://mcstatus.io/) for providing the server status API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vercel](https://vercel.com/) for hosting

## 👨‍💻 Developer

- **Kasuma Bali** - [GitHub](https://github.com/kasumabalidps)

## 🔗 Links

- [Live Demo](https://your-demo-url.vercel.app)
- [GitHub Repository](https://github.com/kasumabalidps/minecraft-server-lookup)
- [Report Bug](https://github.com/kasumabalidps/minecraft-server-lookup/issues)
- [Request Feature](https://github.com/kasumabalidps/minecraft-server-lookup/issues)
