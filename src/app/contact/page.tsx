import ContactForm from '@/components/client/ContactForm';
import Container from '@/components/Container';

export default function ContactPage() {
  return (
    <Container className="pt-32 pb-16">
      <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md">
        <ContactForm />
      </div>
    </Container>
  );
}
