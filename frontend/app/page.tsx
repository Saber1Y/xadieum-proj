import Link from "next/link";
import { ArrowRight, BarChart3, Zap, Shield, Globe } from "lucide-react";
import { SiSimpleanalytics } from "react-icons/si";
import {
  FadeInUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #10123e 60%, #ffa20a 100%)",
      }}
    >
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50  border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">Xandeum</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#stats"
              className="text-gray-300 hover:text-white transition"
            >
              Stats
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition"
            >
              About
            </a>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-[#ffa20a] hover:bg-[#10123e] text-[#10123e] hover:text-[#ffa20a] rounded-lg font-semibold transition border-2 border-[#10123e]"
            >
              Dashboard
            </Link>
          </div>
          <div className="md:hidden">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#ffa20a] text-[#10123e] rounded-lg text-sm font-semibold border-2 border-[#10123e]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp delay={0.1}>
            <div className="mb-6 inline-block">
              <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/50 rounded-full text-indigo-300 text-sm font-semibold">
                Next-Gen Analytics for Decentralized Networks
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Monitor Your{" "}
              <span className="bg-[#ffa20a] bg-clip-text text-transparent">
                pNodes
              </span>{" "}
              in Real-Time
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Powerful analytics dashboard for Xandeum pNode networks. Track
              node health, storage capacity, and network performance with
              intuitive visualizations and real-time data.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-[#ffa20a]  text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                Launch Dashboard <ArrowRight size={20} />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/20 transition"
              >
                Learn More
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <FadeInUp delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to monitor and manage your Xandeum pNode
              network
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
            {[
              {
                icon: <SiSimpleanalytics size={32} />,
                title: "Real-Time Analytics",
                description:
                  "Live dashboard with up-to-date metrics on node performance, storage usage, and network health.",
              },
              {
                icon: <Zap size={32} />,
                title: "Fast Data Retrieval",
                description:
                  "Lightning-fast JSON-RPC calls directly to pRPC endpoints for instant network insights.",
              },
              {
                icon: <Shield size={32} />,
                title: "Secure Monitoring",
                description:
                  "Enterprise-grade security with encrypted data transmission and secure API endpoints.",
              },
              {
                icon: <Globe size={32} />,
                title: "Global Network View",
                description:
                  "Monitor nodes across the entire Xandeum network with geographical and performance filtering.",
              },
            ].map((feature, i) => (
              <StaggerItem key={i}>
                <ScaleIn delay={i * 0.1}>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition group">
                    <div className="text-[#ffa20a] mb-4 group-hover:text-indigo-300 transition">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-6 py-20">
        <FadeInUp delay={0.1}>
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-12">
            <StaggerContainer delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { number: "20,000+", label: "pNodes Monitored" },
                  { number: "99.9%", label: "Average Uptime" },
                  { number: "5 Sec", label: "Update Interval" },
                ].map((stat, i) => (
                  <StaggerItem key={i}>
                    <div className="text-center">
                      <div className="text-5xl font-bold bg-[#ffa20a] bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-300 text-lg">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </FadeInUp>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20">
        <FadeInUp delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              About pNode Analytics
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <FadeInUp delay={0.2}>
                <p>
                  The Xandeum pNode Analytics Dashboard is a comprehensive
                  monitoring and analytics platform designed for the Xandeum
                  decentralized network. Built with cutting-edge web
                  technologies, it provides real-time insights into pNode
                  performance, network health, and storage utilization.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <p>
                  Our dashboard connects directly to Xandeum's pRPC endpoints,
                  providing you with accurate, up-to-the-second data about your
                  nodes. Whether you're running a single node or managing a
                  large-scale deployment, our analytics tools give you the
                  visibility you need.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <p>
                  Powered by Next.js, React, and Tailwind CSS, the dashboard
                  delivers a fast, responsive experience across all devices. The
                  modular architecture ensures easy integration with real pRPC
                  endpoints once they're fully deployed.
                </p>
              </FadeInUp>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <FadeInUp delay={0.1}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
            <FadeInUp delay={0.2}>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="text-lg text-indigo-100 mb-8">
                Access your pNode analytics dashboard now
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-[#ffa20a] text-indigo-600 hover:bg-gray-100 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Go to Dashboard <ArrowRight className="inline ml-2" size={20} />
              </Link>
            </FadeInUp>
          </div>
        </FadeInUp>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-white font-bold">Xandeum</span>

              <p className="text-gray-400 text-sm">pNode Analytics Platform</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="/dashboard" className="hover:text-white transition">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Xandeum pNode Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
