import 'package:flutter/material.dart';

class RegistrationStep4 extends StatefulWidget {
  const RegistrationStep4({super.key});

  @override
  State<RegistrationStep4> createState() => _RegistrationStep4State();
}

class _RegistrationStep4State extends State<RegistrationStep4> {
  bool _frontPhotoUploaded = false;
  bool _backPhotoUploaded = false;
  bool _selfiePhotoUploaded = false;

  bool _deliverySelf = false;
  bool _deliveryPost = false;
  bool _deliveryPickup = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Bozorcha Seller',
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Индикатори қадам
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: Colors.orange.shade50,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Қадами 4 аз 4',
                  style: TextStyle(
                    color: Colors.orange,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Сарлавҳа
            const Text(
              'Тасдиқи шахсият',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),

            const Text(
              'Барои тасдиқи шахсият, лутфан 3 аксро бор кунед:',
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 20),

            // Акси пеши паспорт
            _buildPhotoUploadButton(
              title: 'Акси пеши паспорт',
              isUploaded: _frontPhotoUploaded,
              onTap: () {
                setState(() {
                  _frontPhotoUploaded = true;
                });
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Акси пеш бор шуд (танзимоти санҷишӣ)'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
            ),
            const SizedBox(height: 15),

            // Акси пушти паспорт
            _buildPhotoUploadButton(
              title: 'Акси пушти паспорт',
              isUploaded: _backPhotoUploaded,
              onTap: () {
                setState(() {
                  _backPhotoUploaded = true;
                });
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Акси пушт бор шуд (танзимоти санҷишӣ)'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
            ),
            const SizedBox(height: 15),

            // Селфи бо паспорт
            _buildPhotoUploadButton(
              title: 'Селфи бо паспорт',
              isUploaded: _selfiePhotoUploaded,
              onTap: () {
                setState(() {
                  _selfiePhotoUploaded = true;
                });
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Селфи бор шуд (танзимоти санҷишӣ)'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
            ),
            const SizedBox(height: 30),

            // Сарлавҳаи доставка
            const Text(
              'Усули доставка',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),

            const Text(
              'Чӣ гуна маҳсулотро ба харидорон мерасонед?',
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 15),

            // Доставкаи шахсӣ
            CheckboxListTile(
              title: const Text('Доставкаи шахсӣ (худам мерасонам)'),
              value: _deliverySelf,
              activeColor: Colors.orange,
              onChanged: (value) {
                setState(() {
                  _deliverySelf = value!;
                });
              },
            ),

            // Тавассути почта
            CheckboxListTile(
              title: const Text('Тавассути почтаи Тоҷикистон'),
              value: _deliveryPost,
              activeColor: Colors.orange,
              onChanged: (value) {
                setState(() {
                  _deliveryPost = value!;
                });
              },
            ),

            // Супоридани дастӣ
            CheckboxListTile(
              title: const Text('Танҳо супоридани дастӣ (харидор худаш меояд)'),
              value: _deliveryPickup,
              activeColor: Colors.orange,
              onChanged: (value) {
                setState(() {
                  _deliveryPickup = value!;
                });
              },
            ),
            const SizedBox(height: 10),

            // Матни ёдрас
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.blue.shade200),
              ),
              child: Row(
                children: [
                  Icon(Icons.info_outline, color: Colors.blue.shade700),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Пас аз фиристодан, маълумоти шумо барои санҷиш фиристода мешавад. Натиҷа дар давоми 1-2 рӯз огоҳ хоҳед шуд.',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.blue.shade700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),

            // Тугмаи Фиристодан
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () {
                  // Санҷиши аксҳо
                  if (_frontPhotoUploaded && _backPhotoUploaded && _selfiePhotoUploaded) {
                    // Санҷиши доставка (ҳадди ақал як усул)
                    if (_deliverySelf || _deliveryPost || _deliveryPickup) {
                      // Ба саҳифаи интизорӣ гузаштан
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Маълумот барои санҷиш фиристода шуд!'),
                          backgroundColor: Colors.green,
                        ),
                      );
                      
                      // Диалоги муваффақият
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: const Text('Табрик!'),
                          content: const Text(
                            'Маълумоти шумо барои санҷиш фиристода шуд. '
                            'Пас аз тасдиқ, шумо метавонед маҳсулот гузоред.'
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.pop(context); // бастани диалог
                                Navigator.popUntil(context, ModalRoute.withName('/')); // ба саҳифаи асосӣ
                              },
                              child: const Text('Хуб'),
                            ),
                          ],
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Лутфан ҳадди ақал як усули доставкаро интихоб кунед'),
                          backgroundColor: Colors.red,
                        ),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Лутфан ҳар се аксро бор кунед'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Фиристодан барои санҷиш',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  // Функсия барои сохтани тугмаҳои боркунии акс
  Widget _buildPhotoUploadButton({
    required String title,
    required bool isUploaded,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 15),
        decoration: BoxDecoration(
          border: Border.all(
            color: isUploaded ? Colors.green : Colors.grey.shade300,
            width: isUploaded ? 2 : 1,
          ),
          borderRadius: BorderRadius.circular(12),
          color: isUploaded ? Colors.green.shade50 : Colors.grey.shade50,
        ),
        child: Row(
          children: [
            Icon(
              isUploaded ? Icons.check_circle : Icons.upload_file,
              color: isUploaded ? Colors.green : Colors.grey.shade600,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: isUploaded ? FontWeight.w500 : FontWeight.normal,
                  color: isUploaded ? Colors.green.shade800 : Colors.black,
                ),
              ),
            ),
            if (isUploaded)
              const Icon(Icons.check, color: Colors.green),
          ],
        ),
      ),
    );
  }
}
