import time
import requests
import json
import pyqrcode
import vk_api
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload
from vk_api.utils import get_random_id
from vk_api.keyboard import VkKeyboard, VkKeyboardColor
import random
import pymysql

#========================SQL==============================
def destination(id):
	sql = "SELECT destination FROM plan WHERE id={};".format(id)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def client_destination(id):
	#имя и адресат заказчика
	sql = "SELECT name, destination FROM clients WHERE id={};".format(id)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0]
	return "{}\n{}".format(r[0],r[1])
#========================SQL==============================
def provider_destination(id):
	#имя и адресат поставщика
	sql = "SELECT name, destination FROM providers WHERE id={};".format(id)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0]
	return "{}\n{}".format(r[0],r[1])
#========================SQL==============================
def get_id_driver(vk):
	#узнать ид водителя
	r = 0
	sql = "SELECT id FROM drivers WHERE vk={};".format(vk)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def get_cur_item():
	#узнать текущий пункт плана
	r = 0
	sql = "SELECT item FROM active WHERE id = 1;"
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		lst = cur.fetchall()
		r = lst[0][0]
	return r
#========================SQL==============================
def set_cur_item(value):
	#установить новое значение для текущего пункта плана
	sql = "UPDATE active SET item={};".format(value)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
#========================SQL==============================
def get_type_driver(vk):
	#узнать тип водителя
	r = 0
	sql = "SELECT type FROM drivers WHERE vk={};".format(vk)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def get_status_driver(vk):
	#узнать статус водителя
	r = 0
	sql = "SELECT status FROM drivers WHERE vk={};".format(vk)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def set_status_driver(vk, value):
	#установить новое значение для статуса водителя
	sql = "UPDATE drivers SET status={} WHERE vk={};".format(value,vk)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
#========================SQL==============================
def id_uncompleted(type_trans):
	#узнать идешник первой не выполненной строки текущего пункта плана
	item_cur = get_cur_item()
	list_lines_cur_item = []
	sql = "SELECT id FROM plan WHERE item={} AND type={} AND driver=0 AND completed=0;".format(item_cur, type_trans)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		lst = cur.fetchall()
		list_lines_cur_item = [e[0] for e in lst]
	return list_lines_cur_item[0] if list_lines_cur_item != [] else None
#========================SQL==============================
def empty_threads():
	#план заданий пуст?
	r = 0
	sql = "SELECT COUNT(*) FROM plan WHERE driver=0 AND completed=0;"
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		r = cur.fetchall()[0]
	return True if r == 0 else False
#========================SQL==============================
def empty_item_threads():
	#план заданий для текущего пункта пуст?
	r = 0
	item_cur = get_cur_item()
	sql = "SELECT COUNT(*) FROM plan WHERE item={} AND driver=0 AND completed=0;".format(item_cur)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	else:
		r = cur.fetchall()[0]
	return True if r == 0 else False
#========================SQL==============================
def do_thread(id_item, id_driver):
	#выдать задание водителю
	sql = "UPDATE plan SET driver={} WHERE id={};".format(id_driver, id_item)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
#========================SQL==============================
def completed_thread(id_item):
	#завершить задание
	sql = "UPDATE plan SET completed=1 WHERE id={};".format(id_item)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
#========================SQL==============================
def id_thread(id_driver):
	#определить ид задания водителя
	sql = "SELECT id FROM plan WHERE driver={} AND completed=0 LIMIT 1;".format(id_driver)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def product_thread(id):
	sql = "SELECT product FROM plan WHERE id={};".format(id)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0][0]
	return r
#========================SQL==============================
def count_thread(id):
	sql = "SELECT count FROM plan WHERE id={};".format(id)
	try:
		cur.execute(sql)
	except pymysql.DatabaseError as err:
		print("!!!ошибка запроса!!!")
		print(err)
	r = cur.fetchall()[0][0]
	return r
#========================SQL==============================

token = "fd4f7d8530ad69dbd650b5bf9040f70674f56a2d9bd180cb7ac9ef5b2e3dd00b7bd53642fd298dc9d9d8f"
vk_session = vk_api.VkApi(token=token)
vk = vk_session.get_api()

longpoll = VkLongPoll(vk_session)
upload = VkUpload(vk_session)

text_buttons_d = ['забрал груз','доставил груз','принять заказ']
text_messages_d = ['вам необходимо забрать груз','вам необходимо его доставить','вам необходимо принять заказ']
keyboard_d = []
for i in range(len(text_buttons_d)):
	e = VkKeyboard(one_time=False)
	e.add_button(text_buttons_d[i], color=VkKeyboardColor.DEFAULT)
	keyboard_d.append(e)

text_buttons_p = ['забрал груз','доставил груз','принять заказ']
text_messages_p = ['вам необходимо забрать груз','вам необходимо его доставить','вам необходимо принять заказ']
keyboard_p = []
for i in range(len(text_buttons_p)):
	e = VkKeyboard(one_time=False)
	e.add_button(text_buttons_p[i], color=VkKeyboardColor.DEFAULT)
	keyboard_p.append(e)

print("запуск чат-бота")
print("попытка соединения с СУБД")
for _ in range(5):#пять попыток
	try:
		con = pymysql.connect(host='localhost',#адрес СУБД
			user='robot',#логин
			password='12345678',#пароль
			db='stock')#имя базы данных
		break
	except:
		print("попытка не удалась")
		time.sleep(1)
		continue
else:
	print('критическая ошибка')
	exit()
print("соединился с СУБД")

cur = con.cursor()

for event in longpoll.listen():
	if event.type == VkEventType.MESSAGE_NEW:
		
		if event.to_me:
		
			request = event.text
#=============================ADMIN========================================
			if event.user_id == 151979127:#учетка админа
				if request == "exit":
					cur.close()
					con.close()
					print("завершение работы бота")
					break
				continue
#==========================================================================
			if  get_type_driver(event.user_id) == 1:#водитель для доставки до заказчика
				if request == "Начать":
					vk.messages.send(
						user_id=event.user_id,
						random_id=get_random_id(),
						message="Добро пожаловать!!!\n"+text_messages_d[2],
						keyboard=keyboard_d[2].get_keyboard()
					)
					set_status_driver(event.user_id,0)
					con.commit()
					continue
				else:
					if get_status_driver(event.user_id) == 0:
						if empty_threads() == True:#если заданий в плане нет, то ...
							vk.messages.send(
								user_id=event.user_id,
								random_id=get_random_id(),
								message="Текущий план выполнен"
							)
							continue
						if empty_item_threads() == True:#если заданий нет в текущем пункте плана, то ...
							#перейти на новый пункт плана
							set_cur_item(get_cur_item() + 1)
							con.commit()
						id_uncom = id_uncompleted(1)#найти задание для водителя
						if id_uncom == None:
							vk.messages.send(
								user_id=event.user_id,
								random_id=get_random_id(),
								message="На данный момент заданий нет, повторите попытку через 5 минут"
							)
							continue
						else:
							#выдать задание
							do_thread(id_uncom, get_id_driver(event.user_id))
							con.commit()
						#вывести qr для выдаче на складе
						path = "qr.png"						
						s =  "2{}{}{}".format(product_thread(id_uncom),count_thread(id_uncom),999999)
						qr = pyqrcode.create(s)
						qr.png(path,scale=8)
						url = vk.photos.getMessagesUploadServer()['upload_url']
						request = requests.post(url, files={'photo': open(path, 'rb')})
						photo = vk.photos.saveMessagesPhoto(**request.json())[0]
						attachment = f"photo{photo['owner_id']}_{photo['id']}"
						vk.messages.send(
							user_id=event.user_id,
							attachment=attachment,
							random_id=get_random_id(),
							message=client_destination(destination(id_uncom)),
						)
					vk.messages.send(
						user_id=event.user_id,
						random_id=get_random_id(),
						message=text_messages_d[get_status_driver(event.user_id)],
						keyboard=keyboard_d[get_status_driver(event.user_id)].get_keyboard()
					)
					if get_status_driver(event.user_id) < 2:
						set_status_driver(event.user_id, get_status_driver(event.user_id) + 1)
						con.commit()
					else:
						completed_thread(id_thread(get_id_driver(event.user_id)))
						set_status_driver(event.user_id, 0 )
						con.commit()
############################################################################################
			if get_type_driver(event.user_id) == 0:#водитель для поставки на склад
				if request == "Начать":
					vk.messages.send(
						user_id=event.user_id,
						random_id=get_random_id(),
						message="Добро пожаловать!!!\n"+text_messages_p[2],
						keyboard=keyboard_p[2].get_keyboard()
					)
					set_status_driver(event.user_id,0)
					con.commit()
				else:
					if get_status_driver(event.user_id) == 0:
						if empty_threads() == True:#если заданий в плане нет, то ...
							vk.messages.send(
								user_id=event.user_id,
								random_id=get_random_id(),
								message="Текущий план выполнен"
							)
							continue
						if empty_item_threads() == True:#если заданий нет в текущем пункте плана, то ...
							#перейти на новый пункт плана
							set_cur_item(get_cur_item() + 1)
							con.commit()
						id_uncom = id_uncompleted(0)#найти задание для водителя
						if id_uncom == None:
							vk.messages.send(
								user_id=event.user_id,
								random_id=get_random_id(),
								message="На данный момент заданий нет, повторите попытку через 5 минут"
							)
							continue
						else:
							#выдать задание
							do_thread(id_uncom, get_id_driver(event.user_id))
							con.commit()
							vk.messages.send(
								user_id=event.user_id,
								random_id=get_random_id(),
								message=provider_destination(destination(id_uncom))
							)

					if get_status_driver(event.user_id) == 1:
						path = "qr.png"						
						s =  "1{}{}{}".format(product_thread(id_thread(get_id_driver(event.user_id))),count_thread(id_thread(get_id_driver(event.user_id))),999999)
						qr = pyqrcode.create(s)
						qr.png(path,scale=8)
						url = vk.photos.getMessagesUploadServer()['upload_url']
						request = requests.post(url, files={'photo': open(path, 'rb')})
						photo = vk.photos.saveMessagesPhoto(**request.json())[0]
						attachment = f"photo{photo['owner_id']}_{photo['id']}"
						vk.messages.send(
							user_id=event.user_id,
							attachment=attachment,
							random_id=get_random_id(),
							message="QRCode",
						)
					vk.messages.send(
						user_id=event.user_id,
						random_id=get_random_id(),
						message=text_messages_p[get_status_driver(event.user_id)],
						keyboard=keyboard_p[get_status_driver(event.user_id)].get_keyboard()
					)
					if get_status_driver(event.user_id) < 2:
						set_status_driver(event.user_id, get_status_driver(event.user_id) + 1)
						con.commit()
					else:
						completed_thread(id_thread(get_id_driver(event.user_id)))#завершаем задание
						set_status_driver(event.user_id, 0)
						con.commit()
