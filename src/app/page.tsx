export default function LandingPage() {
  return (
    <>

      <section className="px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Cybersecurity, <span className="text-cyan-400">Simplified</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          Manage Cloud Security, Red Team Assessments, and VAPT issues in one
          powerful platform.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Security Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature
            title="Cloud Security"
            desc="Identify misconfigurations and risks in cloud infrastructure."
          />
          <Feature
            title="Red Team Assessment"
            desc="Simulate real-world attacks to test your defenses."
          />
          <Feature
            title="VAPT"
            desc="Detect and fix vulnerabilities before attackers do."
          />
        </div>
      </section>
    </>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 border border-gray-800 rounded-lg bg-black">
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
