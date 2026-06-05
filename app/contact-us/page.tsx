import ContactUsForm from '@/components/ContactUsForm';

export const metadata = {
  title: 'Contact Us | Reamo',
};

export default function ContactUs() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Get in touch with the Reamo team
          </h1>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Have questions about our beta, interested in partnerships, or need technical support?
            Send us a message and our team will get back to you shortly.
          </p>
          <div
            className="mt-6 h-px w-full"
            style={{
              background: 'linear-gradient(to right, rgba(0,212,160,0.4), transparent)',
            }}
          />
        </div>

        <ContactUsForm />
      </div>
    </div>
  );
}
