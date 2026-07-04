import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Posts iniciais
  await prisma.post.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Por que a ansiedade faz você repetir os mesmos padrões?',
        slug: 'ansiedade-padroes-repetitivos',
        excerpt: 'Entenda como a ansiedade cria ciclos inconscientes e como a terapia integrativa pode te ajudar a sair deles.',
        content: `A ansiedade não é apenas uma sensação passageira. Para muitas mulheres, ela se torna um padrão — um jeito automático de reagir à vida que se repete sem que a gente perceba.

Você já se viu em relacionamentos parecidos com os anteriores? Escolhendo os mesmos tipos de trabalho, as mesmas situações que te fazem sentir pequena?

**A raiz do padrão**

Nosso sistema nervoso aprende padrões de segurança desde criança. Quando algo parece "normal" — mesmo que seja doloroso — o cérebro o registra como familiar. E o familiar dá uma sensação falsa de segurança.

A terapia integrativa trabalha justamente nessa camada mais profunda: não só o que você pensa, mas o que você sente no corpo, nas suas relações e na sua história.

**Como começar a mudar**

1. Observe sem julgamento. O primeiro passo é simplesmente perceber quando o padrão aparece.
2. Respire. Literalmente — o sistema nervoso se acalma quando respiramos devagar.
3. Pergunte-se: "Isso que estou fazendo agora é uma escolha ou uma reação automática?"

A mudança não acontece de uma hora pra outra. Mas ela começa com uma decisão: a de se conhecer de verdade.`,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category: 'ansiedade',
        published: true,
        featured: true,
      },
      {
        title: 'O que é terapia integrativa e como ela pode te transformar',
        slug: 'o-que-e-terapia-integrativa',
        excerpt: 'A terapia integrativa une diferentes abordagens para cuidar de você de forma completa — mente, emoções e corpo.',
        content: `A terapia integrativa é uma abordagem que não se prende a uma única escola ou método. Ela combina diferentes ferramentas — da psicologia humanista à terapia cognitiva, do trabalho com o corpo às práticas de atenção plena — para criar um processo de cura único para cada pessoa.

**O que a diferencia**

Enquanto uma abordagem tradicional pode focar só nos pensamentos ou só no comportamento, a terapia integrativa enxerga você como um todo. Sua história, seu corpo, suas emoções, seus relacionamentos — tudo faz parte do processo.

**Para quem é**

É especialmente poderosa para quem:
- Sente que "sabe o que precisa fazer, mas não consegue"
- Repete padrões que não consegue quebrar sozinha
- Quer se conhecer mais profundamente
- Está em um momento de transição ou recomeço

**Como funciona na prática**

Nas sessões, trabalhamos de forma segura e acolhedora. Não há cobranças, não há respostas certas ou erradas. Há espaço para você ser quem você realmente é.`,
        imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
        category: 'terapia',
        published: true,
        featured: false,
      },
      {
        title: '5 sinais de que você precisa cuidar mais de você',
        slug: '5-sinais-autocuidado',
        excerpt: 'O autocuidado não é luxo — é necessidade. Veja se você está ignorando os sinais que seu corpo e mente estão mandando.',
        content: `Às vezes a vida vai tão rápido que a gente esquece de olhar pra si mesma. Mas o corpo e a mente sempre avisam quando algo está fora do equilíbrio.

**1. Você acorda cansada mesmo depois de dormir**

Isso não é falta de vontade. É um sinal de que seu sistema nervoso está em modo de alerta constante.

**2. Pequenas coisas te irritam muito**

Quando a tolerância diminui, é porque os recursos internos estão no limite.

**3. Você não consegue lembrar a última vez que se divertiu de verdade**

O prazer é um termômetro emocional importante. Se ele sumiu, algo precisa de atenção.

**4. Você está no piloto automático**

Come sem saborear, dorme sem descansar, vive sem sentir. O piloto automático é o jeito que o cérebro se protege do excesso.

**5. Você se sente só mesmo cercada de pessoas**

A solidão interna é um dos sinais mais claros de que você perdeu a conexão consigo mesma.

Reconheceu algum desses sinais? Saiba que isso não é fraqueza — é coragem de perceber.`,
        imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800',
        category: 'autocuidado',
        published: true,
        featured: false,
      },
    ],
  })

  // Depoimentos
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Ana Paula S.',
        initials: 'AP',
        text: 'As sessões com a Martha mudaram completamente como eu me relaciono comigo mesma. Finalmente consigo perceber meus padrões antes de me machucar.',
        stars: 5,
      },
      {
        name: 'Juliana M.',
        initials: 'JM',
        text: 'Comecei com muita resistência, mas a Martha tem uma forma tão acolhedora de conduzir as sessões que eu me abri de um jeito que nunca imaginei.',
        stars: 5,
      },
      {
        name: 'Carla R.',
        initials: 'CR',
        text: 'Depois de anos repetindo os mesmos ciclos, encontrei clareza. A terapia integrativa me deu ferramentas reais para viver com mais leveza.',
        stars: 5,
      },
      {
        name: 'Fernanda L.',
        initials: 'FL',
        text: 'Nunca pensei que 30 minutos pudessem ser tão transformadores. Cada sessão me deixa com insights que fico processando por dias.',
        stars: 5,
      },
    ],
  })

  // Configurações padrão
  await prisma.setting.createMany({
    skipDuplicates: true,
    data: [
      { key: 'site_name', value: 'Martha Angelo' },
      { key: 'tagline', value: 'Terapia Integrativa · Ansiedade · Recomeços' },
      { key: 'instagram', value: 'https://www.instagram.com/marthaangeloo/' },
      { key: 'whatsapp', value: '5511999999999' },
      { key: 'email', value: 'contato@marthaangelo.com.br' },
      { key: 'session_30_price', value: '45' },
      { key: 'session_60_price', value: '100' },
      { key: 'hotmart_url', value: 'https://hotmart.com/pt-br/marketplace/produtos/conhecendo-o-meu-eu-interior-um-guia-rapido-para-recomecar-com-forca-e-clareza/T104825108D' },
    ],
  })

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
