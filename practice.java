public class practice {
    public static void main(String[] arg) {
        String name1 = "race";
        String name2 = "care";
        char c[] = name1.toCharArray();
        char d[] = name2.toCharArray();
        int count = 0;
        for (int i = 0; i <= c.length - 1; i++) {
            for (int j = 0; j <= d.length - 1; j++) {
                if (c[i] == d[j]) {
                    count++;
                }

            }
        }
        if (count == c.length) {
            System.out.println("its anagram");
        } else {

            System.out.println("its not anagram");
        }
    }
}