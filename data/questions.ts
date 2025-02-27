import { tr } from '../localization/translations';

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuestionCategory = 'traffic_rules' | 'road_signs' | 'first_aid' | 'vehicle_maintenance';

export const QUESTION_CATEGORIES: { id: QuestionCategory; title: string; color: string }[] = [
  { id: 'traffic_rules', title: 'Trafik Kuralları', color: '#3b82f6' },
  { id: 'road_signs', title: 'Trafik İşaretleri', color: '#10b981' },
  { id: 'first_aid', title: 'İlk Yardım', color: '#ef4444' },
  { id: 'vehicle_maintenance', title: 'Araç Bakımı', color: '#f59e0b' },
];

export const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Sarı trafik ışığına yaklaşırken ne yapmalısınız?',
    options: [
      { id: 'A', text: 'Kırmızıya dönmeden önce geçmek için hızlanın' },
      { id: 'B', text: 'Yavaşlayın ve güvenliyse durmaya hazırlanın' },
      { id: 'C', text: 'Görmezden gelin ve normal hızda devam edin' },
      { id: 'D', text: 'Konumunuz ne olursa olsun hemen durun' }
    ],
    correctOptionId: 'B',
    explanation: 'Sarı ışığa yaklaşırken, güvenliyse durmak için yavaşlamalısınız. Hızlanmak tehlikelidir ve aniden durmak arkadan çarpma kazasına neden olabilir.',
    category: 'traffic_rules',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'Direksiyon simidinde doğru el pozisyonu nedir?',
    options: [
      { id: 'A', text: 'Bir el saat 12 pozisyonunda' },
      { id: 'B', text: 'İki el saat 10 ve 2 pozisyonunda' },
      { id: 'C', text: 'İki el saat 9 ve 3 pozisyonunda' },
      { id: 'D', text: 'Bir el saat 6 pozisyonunda' }
    ],
    correctOptionId: 'C',
    explanation: 'Saat 9 ve 3 pozisyonu (eller direksiyonun karşılıklı taraflarında) sürüş sırasında en iyi kontrol ve stabiliteyi sağlar ve hava yastığı açılırsa yaralanma riskini azaltır.',
    category: 'traffic_rules',
    difficulty: 'easy'
  },
  {
    id: '3',
    text: 'Aracınızın lastik basıncını ne zaman kontrol etmelisiniz?',
    options: [
      { id: 'A', text: 'Sadece yıllık araç muayenesi sırasında' },
      { id: 'B', text: 'Sadece lastikler inik göründüğünde' },
      { id: 'C', text: 'Aylık ve uzun yolculuklardan önce' },
      { id: 'D', text: 'Sadece kış aylarında' }
    ],
    correctOptionId: 'C',
    explanation: 'Lastik basıncı aylık olarak ve uzun yolculuklardan önce lastikler soğukken kontrol edilmelidir. Uygun lastik basıncı yakıt verimliliğini artırır, lastik ömrünü uzatır ve daha iyi yol tutuş ve güvenlik sağlar.',
    category: 'vehicle_maintenance',
    difficulty: 'medium'
  },
  {
    id: '4',
    text: 'Kaza yerinde bilinçsiz bir kişiyle karşılaştığınızda ilk olarak ne yapmalısınız?',
    options: [
      { id: 'A', text: 'Onları daha rahat bir pozisyona taşıyın' },
      { id: 'B', text: 'Nefes alıp almadığını ve nabzını kontrol edin' },
      { id: 'C', text: 'Su verin' },
      { id: 'D', text: 'Hemen CPR uygulayın' }
    ],
    correctOptionId: 'B',
    explanation: 'Her zaman önce nefes alıp almadığını ve nabzını kontrol edin. Bu değerlendirme, bir sonraki adımda ne yapılacağını belirler. Yaralı bir kişiyi hareket ettirmek omurga yaralanmalarını kötüleştirebilir ve CPR sadece nabız yoksa uygulanmalıdır.',
    category: 'first_aid',
    difficulty: 'hard'
  },
  {
    id: '5',
    text: 'Beyaz oklu yuvarlak mavi bir işaret neyi gösterir?',
    options: [
      { id: 'A', text: 'Tek yönlü yol' },
      { id: 'B', text: 'Takip edilmesi gereken zorunlu yön' },
      { id: 'C', text: 'Önerilen rota' },
      { id: 'D', text: 'Otoyol girişi' }
    ],
    correctOptionId: 'B',
    explanation: 'Beyaz oklu yuvarlak mavi bir işaret, takip edilmesi gereken zorunlu bir yönü gösterir. Bu, sürücülere gerekli eylemleri bildiren düzenleyici işaretlerin bir parçasıdır.',
    category: 'road_signs',
    difficulty: 'medium'
  }
];

// Helper function to get questions by category
export function getQuestionsByCategory(category: QuestionCategory): Question[] {
  return sampleQuestions.filter(q => q.category === category);
}

// Helper function to get random questions
export function getRandomQuestions(count: number = 10): Question[] {
  const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}