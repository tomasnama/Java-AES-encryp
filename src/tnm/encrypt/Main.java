package tnm.encrypt;

public class Main {
	
	private static final String IV = "F27D5C9927726BCEFE7510B1BDD3D137";
	private static final String SALT = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
	private static final int KEY_SIZE = 128;
	private static final int ITERATION_COUNT = 10000;
	private static final String SECRET_PHRASE = "secret";
	
	public static void main(String[] args) throws Exception {
		String text = "test";
		AesUtil aesUtil = new AesUtil(KEY_SIZE, ITERATION_COUNT);
		String encryted = aesUtil.encrypt(SALT, IV, SECRET_PHRASE, text);
		System.out.println(encryted);
		String decrypted = aesUtil.decrypt(SALT, IV, SECRET_PHRASE, encryted);
		System.out.println(decrypted);
		
	}
}
