import JoinForm from '@/components/client/JoinForm';
import Container from '@/components/Container';

export default function JoinPage() {
  return (
    <Container className="pt-32 pb-16">
      <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md">
        <JoinForm />
      </div>
    </Container>
  );
}
