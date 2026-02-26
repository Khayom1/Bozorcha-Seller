import 'package:flutter/material.dart';

class RegistrationStep3 extends StatefulWidget {
  const RegistrationStep3({super.key});

  @override
  State<RegistrationStep3> createState() => _RegistrationStep3State();
}

class _RegistrationStep3State extends State<RegistrationStep3> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _surnameController = TextEditingController();
  final TextEditingController _shopNameController = TextEditingController();
  final TextEditingController _streetController = TextEditingController();
  final TextEditingController _houseController = TextEditingController();

  String _selectedCity = 'Душанбе';
  String _selectedDistrict = 'Сино';

  final List<String> _cities = ['Душанбе', 'Хуҷанд', 'Бохтар', 'Кӯлоб', 'Истаравшан'];
  
  final Map<String, List<String>> _districts = {
    'Душанбе': ['Сино', 'Исмоили Сомонӣ', 'Фирдавсӣ', 'Шоҳмансур'],
    'Хуҷанд': ['Марказ', '20-солагӣ', 'Бобо Ғофуров'],
    'Бохтар': ['Марказ', 'Самадӣ', 'Вахш'],
    'Кӯлоб': ['Марказ', 'Даҳана', 'Зарбдор'],
    'Истаравшан': ['Марказ', 'Ниёзӣ', 'Саразм'],
  };

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
      body: Padding(
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
                  'Қадами 3 аз 4',
                  style: TextStyle(
                    color: Colors.orange,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Матни сарлавҳа
            const Text(
              'Маълумоти шахсӣ',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 15),

            // Ном
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Ном',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Colors.orange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 15),

            // Насаб
            TextField(
              controller: _surnameController,
              decoration: InputDecoration(
                labelText: 'Насаб',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Colors.orange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 15),

            // Номи мағоза (ихтиёрӣ)
            TextField(
              controller: _shopNameController,
              decoration: InputDecoration(
                labelText: 'Номи мағоза (ихтиёрӣ)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Colors.orange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 20),

            const Text(
              'Суроға',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 15),

            // Интихоби шаҳр
            DropdownButtonFormField<String>(
              value: _selectedCity,
              decoration: InputDecoration(
                labelText: 'Шаҳр',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              items: _cities.map((city) {
                return DropdownMenuItem(
                  value: city,
                  child: Text(city),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedCity = value!;
                  _selectedDistrict = _districts[_selectedCity]!.first;
                });
              },
            ),
            const SizedBox(height: 15),

            // Интихоби ноҳия
            DropdownButtonFormField<String>(
              value: _selectedDistrict,
              decoration: InputDecoration(
                labelText: 'Ноҳия',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              items: _districts[_selectedCity]!.map((district) {
                return DropdownMenuItem(
                  value: district,
                  child: Text(district),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedDistrict = value!;
                });
              },
            ),
            const SizedBox(height: 15),

            // Кӯча
            TextField(
              controller: _streetController,
              decoration: InputDecoration(
                labelText: 'Кӯча',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Colors.orange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 15),

            // Рақами хона
            TextField(
              controller: _houseController,
              decoration: InputDecoration(
                labelText: 'Рақами хона',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Colors.orange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 30),

            // Тугмаи Давом
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () {
                  // Санҷиши майдонҳои ҳатмӣ
                  if (_nameController.text.isNotEmpty &&
                      _surnameController.text.isNotEmpty &&
                      _streetController.text.isNotEmpty &&
                      _houseController.text.isNotEmpty) {
                    
                    // Ба саҳифаи 4 гузаштан (ҳанӯз насохтаем)
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Маълумот қабул шуд. Ба қадами 4 гузаред.'),
                        backgroundColor: Colors.green,
                      ),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Лутфан ҳамаи майдонҳои ҳатмиро пур кунед'),
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
                  'Давом',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
